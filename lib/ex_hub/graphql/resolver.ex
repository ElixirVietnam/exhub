defmodule ExHub.Graphql.Resolver do
  @moduledoc """
  This module provide some high order function to resolver.
  In particular, these function will help authorization easier

  It provides 3 functions

  + `permission/1`
  + `permission/2`
  + `is_authenticated/1`

  """

  import ExHub.Gettext
  alias ExHub.Graphql.Permission

  @type resolve_result :: {:ok, any} | {:error, String.t} | {:error, map}
  @type t :: (any, map, map -> resolve_result) | (map, map -> resolve_result)

  defp default_callback(_, _, info) do
    {:ok, Map.get(info.source, String.to_atom(info.definition.name))}
  end

  @doc """
  When we resolve a field, we will need to check does current user has
  permission to view this field.

  For example, each user have a field `password` but only this user could view
  that field, other user when view user profile could not see this one.

  Our resolve system needs to support mechanism to allow developers check
  permissions while resolving. This module address this issue by support
  2 functions `Resolver.permission/2` and `Resolver.permission/1`

  ### `Resolver.permission/2`

  This function takes 2 parameters

    + first parameter is callback function. This is a resolver function of
    Absinthe
    + second parameter is a list of item. Each item in this list is either
    a `permission function`, or an atom

    A `permission function` is a function take 3 parameters as a normal
    Absinthe resolver function, and return `:ok` if user has permission,
    or `:error` if permission is not passed. In case developer want to
    specified error message, he could make permission function return
    `{:error, message}`

    We also support a specical kind of permission function by allow developer
    pass an `permission name` in to the list. When receiving a `permission
    name`, this function will automatically create online a `permission`
    function to check does `current_user` of this request have `permission
    name` on the `parent` of the resolver

  Absinthe resolver be called only if all of permission function is passed.

  ### `Resolver.permission/1`

  This function is similar to `Resolver.permission/2` except it automatically
  choose the Resolver is default Resolver of Absinthe

  ### Example of permission function

      ```elixir
      object :user do
        field :name, :string
        field :company_name, :string
        field :email, :string, resolve:
          (&Resolver.User.get_email/3)
          |> Resolver.permission([
            &Permission.is_authenticated/3,
            &Permission.is_owner/3,
          ])
      end
      ```

  In this example, `email` field only be read if current user is `owner` of
  that field, to do that, we need to defines 2 permission function
  `Permission.is_authenticated/3` and `Permission.is_owner/3`

  Here is how `Permission.is_owner` and `Permission.is_authenticated`
  were defined

      ```elixir
      def is_owner(%User{} = user, _args, %{context: %{current_user: current_user}}) do
        case current_user.id == user.id do
          true -> :ok
          false -> :error
        end
      end
      def is_owner(_, _, _) do
        :error
      end

      def is_authenticated(_, _, %{context: %{error: error}}) do
        {:error, error}
      end
      def is_authenticated(parent, args, %{context: %{current_user: user}} = info) do
        :ok
      end
      ```

  ### Example of permission name

      ```elixir
      object :user do
        field :name, :string
        field :company_name, :string
        field :email, :string, resolve: permission([:owner])
      end
      ```

  In this case, we only allow user read `email` field if `current user` of
  request has permission `owner` with user of email.

  We could define `owner` permission like this

      ```elixir
      # file web/model/user.ex
      defimpl Kipatest.Can, for: Kipatest.User do
        use Kipatest.Web, :model

        def can?(%User{} = subject, :owner, %User{} = user) do
          user.id == subject.id
        end
      end
      ```

  Passing a list of permission name will allow developer create a very consice
  API like this


      ```elixir
      object :company do
        field :name, :string
        connection field :teams, node_type: :team do
          resolve (&Company.teams_query/1)
            |> list
            |> permission([:read_teams, :read_tests, :read_submissions])
        end
      end
      ```

  """
  @spec permission(list) :: Resolver.t
  def permission(permissions) do
    permission(&default_callback/3, permissions)
  end
  @spec permission(Resolver.t, list) :: Resolver.t
  def permission(callback, permissions) do
    fn parent, args, info ->
      result = Enum.reduce(permissions, :ok, fn
        permission_fun, :ok when is_function(permission_fun) ->
          permission_fun.(parent, args, info)
        permission_name, :ok when is_atom(permission_name) ->
          Permission.can?(permission_name).(parent, args, info)
        _, error ->
          error
      end)

      case result do
        :ok -> Absinthe.Resolution.call(callback, parent, args, info)
        :error -> {:error, dgettext("errors", "permission denied")}
        {:error, message} -> {:error, message}
      end
    end
  end

  @doc """
  Check does this request has a valid access token or not

  We could implement `is_authenticated` as permission function as describe
  in `permission/2` document.

  But if we do that, we have to call it like this

      ```elixir
      object :user do
        field :name, :string
        field :company_name, :string
        field :email, :string, resolve:
          (&Resolver.User.get_email/3)
          |> Resolver.permission([
            &Permission.is_authenticated/3,
            :owner,
          ])
      end
      ```

  `is_authenticated/1` is another way to implement this function, this
  implementation allow us to write resolve like this

      ```elixir
      object :user do
        field :name, :string
        field :joined_company, :company, resolve:
          :joined_company
          |> assoc
          |> permission([:owner])
          |> is_authenticated
      end
      ```
  """
  @spec is_authenticated(Resolver.t) :: Resolver.t
  def is_authenticated(callback) do
    fn
      _, _, %{context: %{error: message}} ->
        {:error, message}
      parent, args, %{context: %{current_user: _user}} = info ->
        Absinthe.Resolution.call(callback, parent, args, info)
    end
  end
end

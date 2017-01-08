defmodule ExHub.Graphql.Ecto do
  @moduledoc """
  This module provide some utility functions to resolve a field base on Ecto
  easier.

  + `list/1`: to resolve a connection field by using a query. This query will
  take 3 parameters from current resolver function, and using Repay.Connection
  to return value.
  NOTE: since this function return a Relay.connection, which in turn will need
  to take input pagination information, it will not batchable, so we use
  `async` plugin to resolve it.
  """

  import Absinthe.Resolution.Helpers
  alias Absinthe.Relay
  alias ExHub.Repo

  defmacro __using__(_) do
    quote do
      import unquote(__MODULE__), only: [
        list: 1,
      ]
    end
  end

  @doc """
  Resolution for list of object to support Relay.
  This function is resolve by using async function of Absinthe

  Example:

      ```elixir
      # schema.ex
      connection field :teams, node_type: :team, resolve: list(&Company.team_query/3)

      # model.ex
      def teams_query(company, _, _) do
        from t in Team,
          where: t.company_id == ^company.id and t.is_active == true,
          order_by: [asc: t.inserted_at]
      end
      ```
  """
  def list(query_func) do
    fn parent, args, info ->
      async(fn ->
        result =
          parent
          |> query_func.(args, info)
          |> Relay.Connection.from_query(&Repo.all/1, args)
        {:ok, result}
      end)
    end
  end
end

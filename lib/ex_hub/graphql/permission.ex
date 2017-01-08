defmodule ExHub.Graphql.Permission do
  @moduledoc false

  @type result :: :ok | :error | {:error, String.t}
  @type t :: (any, map, map -> result) | (map, map -> result)

  @spec can?(atom) :: t
  @spec can?(atom, String.t) :: t

  @doc """
  Check does current user has permission to do action with a resource or not.
  In this case, resource is `parent` - the first parameter of resolution
  function
  """
  def can?(action, message \\ nil) when is_atom(action) do
    fn
      parent, _, %{context: %{current_user: user}} ->
        if ExHub.Can.can?(parent, action, user) do
          :ok
        else
          error_message(message)
        end
      _, _, _ ->
        error_message(message)
    end
  end

  defp error_message(nil), do: :error
  defp error_message(message), do: {:error, message}
end

defmodule ExHub.Plug.Authentication do
  @moduledoc false

  import Plug.Conn

  import ExHub.Gettext
  alias ExHub.{AccessToken, User, Repo}

  def init(_opts), do: nil

  def call(conn, _opts) do
    case extract_access_token(conn) do
      nil ->
        conn
        |> put_private(:absinthe, %{context: %{
            current_user: %User{},
            error: dgettext("errors", "invalid access token")
          }})
      token ->
        cond do
          AccessToken.is_expired(token) ->
            conn
            |> put_private(:absinthe, %{context: %{
                current_user: %User{},
                error: dgettext("errors", "expired access token")
              }})
          not token.is_valid ->
            conn
            |> put_private(:absinthe, %{context: %{
                current_user: %User{},
                error: dgettext("errors", "invalid access token")
              }})
          true ->
            conn
            |> put_private(:absinthe, %{context: %{current_user: token.user}})
        end
    end
  end

  defp extract_access_token(conn) do
    case get_req_header(conn, "x-exhub-token") do
      [value] ->
        case Ecto.UUID.cast(value) do
          {:ok, id} ->
            Repo.one AccessToken.find_user_query(id)
          :error ->
            nil
        end
      [] -> nil
    end
  end
end

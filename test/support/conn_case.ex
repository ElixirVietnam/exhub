defmodule ExHub.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  import other functionality to make it easier
  to build and query models.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with connections
      use Phoenix.ConnTest

      alias ExHub.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      import ExHub.Router.Helpers

      # The default endpoint for testing
      @endpoint ExHub.Endpoint

      @spec build_query(Conn.t, String.t, String.t) :: Conn.t
      def build_query(conn, query, variables \\ "{}") do
        conn
        |> post("/graphql", query: query, variables: variables)
      end

      @spec build_token_query(Conn.t, String.t, String.t, String.t) :: Conn.t
      def build_token_query(conn, token, query, variables \\ "{}") do
        conn
        |> put_req_header("x-exhub-token", token.id)
        |> post("/graphql", query: query, variables: variables)
      end
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(ExHub.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(ExHub.Repo, {:shared, self()})
    end

    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end
end

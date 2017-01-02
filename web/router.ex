defmodule ExHub.Router do
  use ExHub.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
  end

  pipeline :ex_hub do
    plug ExHub.Plug.Locale
    plug ExHub.Plug.Authentication
  end

  pipeline :graphql do
    plug BasicAuth, use_config: {:ex_hub, :admin_authorization}
  end

  scope "/auth" do
	pipe_through :browser

	get "/:provider", ExHub.AuthController, :request
	get "/:provider/callback", ExHub.AuthController, :callback
  end

  scope "/graphiql" do
    pipe_through [:graphql, :ex_hub]

    get "/", Absinthe.Plug.GraphiQL, schema: ExHub.Graphql.Schema
    post "/", Absinthe.Plug.GraphiQL, schema: ExHub.Graphql.Schema
  end

  scope "/" do
    pipe_through [:ex_hub]

    get "/graphql", Absinthe.Plug, schema: ExHub.Graphql.Schema
    post "/graphql", Absinthe.Plug, schema: ExHub.Graphql.Schema
  end
end

# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :ex_hub,
  ecto_repos: [ExHub.Repo],
  admin_authorization: [
    username: "admin",
    password: "exhub",
    realm: "Admin Area"
  ]

# Configures the endpoint
config :ex_hub, ExHub.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "FWI72qcm4dBByPGxcGnVFCylEHd2MmiUkuHCPWg9SIq348FTA37r9lQpO1x26sGB",
  render_errors: [view: ExHub.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ExHub.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures Uberauth
config :ueberauth, Ueberauth,
  providers: [
    github: {Ueberauth.Strategy.Github, [default_scope: "user:email"]}
  ]

config :ueberauth, Ueberauth.Strategy.Github.OAuth,
  client_id: System.get_env("GITHUB_CLIENT_ID"),
  client_secret: System.get_env("GITHUB_CLIENT_SECRET")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

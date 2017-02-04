use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or you later on).
config :ex_hub, ExHub.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [scheme: "http", host: "elixirvn.com"]
  # url: [scheme: "https", host: "elixirvn.com", port: 443],
  # force_ssl: [rewrite_on: [:x_forwarded_proto]],
  # cache_static_manifest: "priv/static/manifest.json",
  # secret_key_base: System.get_env("SECRET_KEY_BASE")

# Configure your database
config :ex_hub, ExHub.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "20"),
  ssl: true

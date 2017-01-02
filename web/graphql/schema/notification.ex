defmodule ExHub.Graphql.Schema.NotificationSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation

  connection node_type: :notification

  object :notification do
    field :content, :string
    field :link, :string
    field :is_seen, :boolean
    field :inserted_at, :string
    field :updated_at, :string
  end
end

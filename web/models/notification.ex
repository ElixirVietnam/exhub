defmodule ExHub.Notification do
  @moduledoc false

  use ExHub.Web, :model

  schema "notifications" do
    field :type, :integer
    field :content
    field :link
    field :is_seen, :boolean, default: false

    belongs_to :user, ExHub.User
    belongs_to :subject, ExHub.Post
    many_to_many :actors, ExHub.User, join_through: "notifications_actors"

    timestamps()
  end

  def changeset(user) do
    %__MODULE__{}
    |> Ecto.Changeset.change(user_id: user.id)
  end

  def all_query(user) do
    from n in __MODULE__,
      where: n.user_id == ^user.id,
      order_by: [desc: n.updated_at]
  end

  def unseen_query(user) do
    from n in __MODULE__,
      where: n.user_id == ^user.id and n.is_seen == false,
      order_by: [desc: n.updated_at]
  end
end

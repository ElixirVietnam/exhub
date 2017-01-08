defmodule ExHub.Tag do
  @moduledoc false

  use ExHub.Web, :model
  alias ExHub.Repo

  schema "tags" do
    field :name

    many_to_many :posts, ExHub.Post, join_through: "posts_tags"

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> Ecto.Changeset.cast(params, [:name])
    |> Ecto.Changeset.unique_constraint(:name)
  end

  def all_query(_, _, _) do
    from t in __MODULE__, order_by: [asc: t.inserted_at]
  end

  def newest_posts_query(tag, _, _) do
    from p in ExHub.Post,
      left_join: t in assoc(p, :tags),
      where: t.id == ^tag.id,
      order_by: [desc: p.inserted_at]
  end

  def most_popular_posts_query(tag, _, _) do
    from p in ExHub.Post,
      left_join: t in assoc(p, :tags),
      where: t.id == ^tag.id,
      order_by: [desc: p.score]
  end

  def find_by_name(_, names) do
    unique_names = names |> MapSet.new |> MapSet.to_list
    query = from t in __MODULE__,
      where: t.name in ^unique_names,
      order_by: [desc: t.inserted_at]

    query
    |> Repo.all
    |> Enum.reduce(%{}, fn item, acc ->
      Map.put(acc, item.name, item)
    end)
  end
end

defmodule ExHub.Category do
  @moduledoc false

  use ExHub.Web, :model
  alias ExHub.Repo

  schema "categories" do
    field :name
    field :index, :integer

    has_many :posts, ExHub.Post

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> Ecto.Changeset.cast(params, [:name])
    |> Ecto.Changeset.unique_constraint(:name)
  end

  def all_query(_, _, _) do
    from c in __MODULE__, order_by: [asc: c.index]
  end

  def newest_posts_query(category, _, _) do
    from p in ExHub.Post,
      where: p.category_id == ^category.id,
      order_by: [desc: p.inserted_at]
  end

  def most_popular_posts_query(category, _, _) do
    from p in ExHub.Post,
      where: p.category_id == ^category.id,
      order_by: [desc: p.score]
  end

  def find_by_name(_, names) do
    unique_names = names |> MapSet.new |> MapSet.to_list
    query = from c in __MODULE__,
      where: c.name in ^unique_names,
      order_by: [desc: c.inserted_at]

    query
    |> Repo.all
    |> Enum.reduce(%{}, fn item, acc ->
      Map.put(acc, item.name, item)
    end)
  end
end

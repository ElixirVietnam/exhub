defmodule ExHub.Category do
  @moduledoc false

  use ExHub.Web, :model

  schema "categories" do
    field :name
    field :index, :integer

    has_many :posts, ExHub.Post

    timestamps()
  end

  def all_query(_) do
    from c in __MODULE__, order_by: [asc: c.index]
  end

  def newest_posts_query(category) do
    from p in ExHub.Post,
      where: p.category_id == ^category.id,
      order_by: [desc: p.inserted_at]
  end

  def most_popular_posts_query(category) do
    from p in ExHub.Post,
      where: p.category_id == ^category.id,
      order_by: [desc: p.score]
  end
end

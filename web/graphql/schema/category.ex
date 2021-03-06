defmodule ExHub.Graphql.Schema.CategorySchema do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation
  use Absinthe.Ecto, repo: ExHub.Repo
  use ExHub.Graphql.Ecto
  alias ExHub.{Category, Repo}

  connection node_type: :category

  object :category do
    field :name, :string

    @desc """
    List all the posts which is belong to current tag.

    This API, posts will be sorted by time. The newer post, the sooner it will
    be loaded.
    """
    connection field :newest_posts, node_type: :post do
      resolve list(&Category.newest_posts_query/3)
    end

    @desc """
    List all the posts which is belong to current tag.

    This API, posts will be sorted by score
    """
    connection field :most_popular_posts, node_type: :post do
      resolve list(&Category.most_popular_posts_query/3)
    end
  end

  object :category_queries do
    @desc """
    List all categories
    """
    connection field :categories, node_type: :category do
      resolve list(&Category.all_query/3)
    end

    @desc """
    Get a category by its name
    """
    field :category, type: :category do
      @desc """
      `name` - name of category
      """
      arg :name, non_null(:string)

      resolve fn _, %{name: name}, _ ->
        batch({Category, :find_by_name}, name, fn batch_result ->
          case batch_result[name] do
            nil -> {:error, "category name not found"}
            category -> {:ok, category}
          end
        end)
      end
    end
  end
end

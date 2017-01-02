defmodule ExHub.Graphql.Schema.TagSchema do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation
  use Absinthe.Ecto, repo: ExHub.Repo
  alias ExHub.{Tag, Repo}

  connection node_type: :tag

  object :tag do
    field :name, :string

    @desc """
    List all the posts which is belong to current tag.

    This API, posts will be sorted by time. The newer post, the sooner it will
    be loaded.
    """
    connection field :newest_posts, node_type: :post do
      resolve list(&Tag.newest_posts_query/1)
    end

    @desc """
    List all the posts which is belong to current tag.

    This API, posts will be sorted by score
    """
    connection field :most_popular_posts, node_type: :post do
      resolve list(&Tag.most_popular_posts_query/1)
    end
  end

  object :tag_queries do
    @desc """
    Get all the tags
    """
    connection field :tags, node_type: :tag do
      resolve list(&Tag.all_query/1)
    end

    @desc """
    Get tag with a specified name
    """
    field :tag, type: :tag do
      @desc """
      + `name` - name of tag
      """
      arg :name, non_null(:string)
      resolve fn _, %{name: name}, _ ->
        # TODO: this should be done in batch
        case Repo.get_by(Tag, name: name) do
          nil -> {:error, "tag name not found"}
          tag -> {:ok, tag}
        end
      end
    end
  end
end

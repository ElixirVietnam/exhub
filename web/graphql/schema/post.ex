defmodule ExHub.Graphql.Schema.PostSchema do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation
  use Absinthe.Ecto, repo: ExHub.Repo
  use ExHub.Graphql.Ecto
  alias ExHub.Graphql.Resolver
  alias ExHub.Post

  connection node_type: :post

  object :post do
    field :id, :id
    field :content, :string
    field :title, :string
    field :link, :string
    field :thumbnail_url, :string
    field :likes_count, :integer
    field :comments_count, :integer
    field :inserted_at, :string
    field :updated_at, :string

    field :user, :user, resolve: assoc(:user)
    field :category, :category, resolve: assoc(:category)

    @desc """
    List all the tags which is belong to current post
    """
    field :tags, list_of(:tag) do
      resolve fn post, _, _ ->
        batch({Post, :find_tags_by_ids}, post.id, fn batch_result ->
          case batch_result[post.id] do
            nil -> {:ok, []}
            tags-> {:ok, tags}
          end
        end)
      end
    end

    @desc """
    List all the comments which is belong to current post

    Currenlty, we only want to sort these comments by time.
    New comments will be load first, old comments are load later
    """
    connection field :comments, node_type: :comment do
      resolve list(&Post.comments_query/3)
    end
  end

  object :post_queries do
    @desc """
    Get all post which is sorted by popularity
    """
    connection field :most_popular_posts, node_type: :post do
      resolve list(&Post.most_popular_posts_query/3)
    end

    @desc """
    Get all post which is sorted by inserted at
    """
    connection field :newest_posts, node_type: :post do
      resolve list(&Post.newest_posts_query/3)
    end

    @desc """
    Get a post by its id
    """
    field :post, type: :post do
      @desc """
      + `id` - post id
      """
      arg :id, non_null(:string)

      resolve fn _, %{id: id}, _ ->
        batch({Post, :find_by_ids}, id, fn batch_result ->
          case batch_result[id] do
            nil -> {:error, "post id not found"}
            post -> {:ok, post}
          end
        end)
      end
    end
  end

  object :post_mutations do
    @desc """
    Create a new post.

    Currently, we do not have any rules to control the process of creating new
    post. If we want to enforce any rules to create special post, we need to
    do it on client side
    """
    payload field :create_post do
      @desc """
      + `category` - category name

      + `content` - a markdown string

      + `title` - string

      + `link` - this field is optional.

      + `thumbnail_url` - this field is optional.

      + `tags` - string. this is a string contains a list of tags which are
      separated by a comma
      """
      input do
        field :category, non_null(:string)
        field :content, non_null(:string)
        field :title, non_null(:string)
        field :link, :string
        field :thumbnail_url, :string
        field :tags, :string
      end

      @desc """
      Possible errors

      + invalid error for each field
      + something went wrong

      This API will return a post if success
      """
      output do
        field :post, :post
      end

      resolve (&Resolver.Post.create_post/3)
              |> Resolver.is_authenticated
    end

    @desc """
    Like a post.

    After user like a post, we will send notification to owner of that post
    """
    payload field :like_post do
      @desc """
      + `post_id` - id
      """
      input do
        field :post_id, :string
      end

      @desc """
      Possible errors

      + invalid error for each field
      + something went wrong

      This API will return a post if success
      """
      output do
        field :post, :post
      end

      resolve (&Resolver.Post.like_post/3)
              |> Resolver.is_authenticated
    end

    @desc """
    Unlike a post.
    """
    payload field :unlike_post do
      @desc """
      + `post_id` - id
      """
      input do
        field :post_id, :string
      end

      @desc """
      Possible errors

      + invalid error for each field
      + something went wrong

      This API will return a post if success
      """
      output do
        field :post, :post
      end

      resolve (&Resolver.Post.unlike_post/3)
              |> Resolver.is_authenticated
    end
  end
end

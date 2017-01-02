defmodule ExHub.Graphql.Schema.PostSchema do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation
  use Absinthe.Ecto, repo: ExHub.Repo
  alias ExHub.Graphql.Resolver
  alias ExHub.Post

  connection node_type: :post

  object :post do
    field :content, :string
    field :title, :string
    field :link, :string
    field :likes_count, :integer
    field :comments_count, :integer
    field :inserted_at, :string
    field :updated_at, :string

    field :user, :user, resolve: assoc(:user)
    field :category, :category, resolve: assoc(:category)
    field :tags, list_of(:tag), resolve: assoc(:tags)

    @desc """
    List all the comment which is belong to current user

    Currenlty, we only want to sort these comments by time.
    New comments will be load first, old comments are load later
    """
    connection field :comments, node_type: :comment do
      resolve list(&Post.comments_query/1)
    end
  end

  object :post_queries do
    @desc """
    Get a post by its id
    """
    field :post, type: :post do
      @desc """
      + `id` - post id
      """
      arg :id, non_null(:string)
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

      + `tags` - string. this is a string contains a list of tags which are
      separated by a comma
      """
      input do
        field :category, non_null(:string)
        field :content, non_null(:string)
        field :title, non_null(:string)
        field :link, :string
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

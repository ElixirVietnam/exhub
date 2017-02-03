defmodule ExHub.Graphql.Schema.CommentSchema do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation
  use Absinthe.Ecto, repo: ExHub.Repo
  alias ExHub.Graphql.Resolver

  connection node_type: :comment

  object :comment do
    field :id, :id
    field :content, :string
    field :likes_count, :string
    field :inserted_at, :string
    field :updated_at, :string

    field :user, :user, resolve: assoc(:user)
  end

  object :comment_mutations do
    @desc """
    Create new comment.

    After user create a comment, we will send notification to all user who
    participated to this post, it means we will send notification to use who
    likes/comments to the post
    """
    payload field :create_comment do
      input do
        field :post_id, non_null(:string)
        field :content, non_null(:string)
      end

      @desc """
      Possible errors

      + invalid post ID
      + something went wrong

      This API will return a comment if success
      """
      output do
        field :comment, :comment
      end

      resolve (&Resolver.Comment.create_comment/3)
              |> Resolver.is_authenticated
    end

    @desc """
    Unlike a comment.
    """
    payload field :like_comment do
      @desc """
      + `post_id` - id
      """
      input do
        field :comment_id, :string
      end

      @desc """
      Possible errors

      + invalid error for each field
      + something went wrong

      This API will return a post if success
      """
      output do
        field :comment, :comment
      end

      resolve (&Resolver.Comment.like_comment/3)
              |> Resolver.is_authenticated
    end

    @desc """
    Unlike a comment.
    """
    payload field :unlike_comment do
      @desc """
      + `post_id` - id
      """
      input do
        field :comment_id, :string
      end

      @desc """
      Possible errors

      + invalid error for each field
      + something went wrong

      This API will return a post if success
      """
      output do
        field :comment, :comment
      end

      resolve (&Resolver.Comment.unlike_comment/3)
              |> Resolver.is_authenticated
    end
  end
end

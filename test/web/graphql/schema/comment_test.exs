defmodule ExHub.Graphql.Schema.CommentTest do
  use Plug.Test
  use ExHub.ConnCase
  alias ExHub.{User, AccessToken, Post, Tag, Category, Repo}

  @default_user %{
    username: "test",
    email: "test@test.com",
    image_url: "url",
  }
  setup do
    user = %User{} |> User.changeset(@default_user) |> Repo.insert!
    token = AccessToken.user_changeset(user) |> Repo.insert!
    cat = %Category{} |> Category.changeset(%{name: "name-1"}) |> Repo.insert!
    tags =
      1..5
      |> Enum.map(fn index ->
        %Tag{} |> Tag.changeset(%{name: "name-#{index}"}) |> Repo.insert!
      end)
    post =
      %Post{}
      |> Post.changeset(%{title: "Hello", content: "content hello"})
      |> Ecto.Changeset.put_assoc(:category, cat)
      |> Ecto.Changeset.put_assoc(:tags, tags)
      |> Repo.insert!
    [post: post, user: user, token: token]
  end

  test "mutation create comment", %{conn: conn, token: token, post: post} do
    detail_query = """
    mutation  {
      createComment(input:{
        clientMutationId:"1",
        postId:"#{post.id}",
        content:"content"
      }) {
        comment {
          id
        }
      }
    }
    """
    conn = build_token_query(conn, token, detail_query)
    assert %{
      "data" => %{
        "createComment" => %{
          "comment" => %{
            "id" => id
          }
        }
      }
    } = json_response(conn, 200)
  end
end

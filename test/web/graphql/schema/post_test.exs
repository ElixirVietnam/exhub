defmodule ExHub.Graphql.Schema.PostTest do
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

  test "query get post", %{conn: conn, post: post} do
    detail_query = """
    query {
      post(id: "#{post.id}") {
        content
        title
        link
        likes_count
        comments_count
        user {
          username
          image_url
        }
        category {
          name
        }
        tags {
          name
        }
      }
      newest_posts(first: 10) {
        edges {
          node {
            content
          }
        }
      }
      most_popular_posts(first: 10) {
        edges {
          node {
            content
          }
        }
      }
    }
    """
    conn = build_query(conn, detail_query)
    assert %{
      "data" => %{
        "post" => %{
          "user" => nil,
          "category" => %{
            "name" => "name-1"
          },
          "tags" => tags
        },
        "most_popular_posts" => %{
          "edges" => most_popular_posts,
        },
        "newest_posts" => %{
          "edges" => newest_posts,
        }
      }
    } = json_response(conn, 200)
    assert 5 == length(tags)
    assert 1 == length(most_popular_posts)
    assert 1 == length(newest_posts)
  end


  test "mutation create post", %{conn: conn, token: token} do
    detail_query = """
    mutation  {
      createPost(input:{
        clientMutationId:"1",
        category:"elixr"
        tags:"hello",
        title:"title",
        content:"content"
      }) {
        post {
          id
        }
      }
    }
    """
    conn = build_token_query(conn, token, detail_query)
    assert %{
      "data" => %{
        "createPost" => %{
          "post" => %{
            "id" => id
          }
        }
      }
    } = json_response(conn, 200)
  end
end

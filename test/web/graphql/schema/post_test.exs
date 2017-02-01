defmodule ExHub.Graphql.Schema.PostTest do
  use Plug.Test
  use ExHub.ConnCase
  alias ExHub.{Post, Tag, Category, Repo}

  setup do
    cat = %Category{} |> Category.changeset(%{name: "name-1"}) |> Repo.insert!
    tags =
      1..5
      |> Enum.map(fn index ->
        %Tag{} |> Tag.changeset(%{name: "name-#{index}"}) |> Repo.insert!
      end)
    post =
      %Post{}
      |> Post.changeset(%{content: "content hello"})
      |> Ecto.Changeset.put_assoc(:category, cat)
      |> Ecto.Changeset.put_assoc(:tags, tags)
      |> Repo.insert!
    [post: post]
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
end

defmodule ExHub.Graphql.Schema.TagTest do
  use Plug.Test
  use ExHub.ConnCase
  alias ExHub.{Post, Tag, Repo}

  setup do
    tag = %Tag{} |> Tag.changeset(%{name: "name-1"}) |> Repo.insert!
    1..5
    |> Enum.map(fn index ->
      %Post{}
      |> Post.changeset(%{content: "content-#{index}", score: index})
      |> Ecto.Changeset.put_assoc(:tags, [tag])
    end)
    |> Enum.each(&Repo.insert/1)
  end

  @list_query """
  query {
    tags(first: 10) {
      edges {
        node {
          name
        }
      }
    }
  }
  """
  test "query all tags", %{conn: conn} do
    conn = build_query(conn, @list_query)
    assert %{
      "data" => %{
        "tags" => %{
          "edges" => data
        }
      }
    } = json_response(conn, 200)
    assert 1 == length(data)
  end

  @detail_query """
  query {
    tag(name: "name-1") {
      name
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
  }
  """
  test "query get tag", %{conn: conn} do
    conn = build_query(conn, @detail_query)
    assert %{
      "data" => %{
        "tag" => %{
          "name" => name,
          "newest_posts" => %{
            "edges" => newest_posts
          },
          "most_popular_posts" => %{
            "edges" => most_popular_posts
          }
        }
      }
    } = json_response(conn, 200)
    assert "name-1" == name
    assert 5 == length(newest_posts)
    assert 5 == length(most_popular_posts)
  end
end


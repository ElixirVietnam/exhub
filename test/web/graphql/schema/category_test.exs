defmodule ExHub.Graphql.Schema.CategoryTest do
  use Plug.Test
  use ExHub.ConnCase
  alias ExHub.{Post, Category, Repo}

  setup do
    category = %Category{} |> Category.changeset(%{name: "name-1"}) |> Repo.insert!
    1..5
    |> Enum.map(fn index ->
      %Post{}
      |> Post.changeset(%{"title": "title", content: "content-#{index}", score: index})
      |> Ecto.Changeset.put_assoc(:category, category)
    end)
    |> Enum.each(&Repo.insert/1)
  end

  @list_query """
  query {
    categories(first: 10) {
      edges {
        node {
          name
        }
      }
    }
  }
  """
  test "query all categories", %{conn: conn} do
    conn = build_query(conn, @list_query)
    assert %{
      "data" => %{
        "categories" => %{
          "edges" => data
        }
      }
    } = json_response(conn, 200)
    assert 1 == length(data)
  end

  @detail_query """
  query {
    category(name: "name-1") {
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
            id
            content
          }
        }
      }
    }
  }
  """
  test "query get category", %{conn: conn} do
    conn = build_query(conn, @detail_query)
    assert %{
      "data" => %{
        "category" => %{
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



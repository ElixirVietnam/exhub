defmodule ExHub.Service.Post.CreatePostServiceTest do
  use ExHub.ModelCase

  alias ExHub.{User, Post, Category, Tag, Repo}
  alias ExHub.Services.Post.CreatePostService

  test "error if create post with category is nil" do
    user =
      %User{}
      |> User.changeset(%{
        username: "new", email: "test1@test.com", image_url: "aaa"
      })
      |> Repo.insert!
    params = %{
      category: "book",
      title: "title",
      content: "content",
    }
    assert {:error , _} = CreatePostService.call(user, params)
  end

  describe "create post" do
    setup do
      user =
        %User{}
        |> User.changeset(%{
          username: "new", email: "test1@test.com", image_url: "aaa"
        })
        |> Repo.insert!
      category =
        %Category{}
        |> Category.changeset(%{name: "book"})
        |> Repo.insert!
      tags =
        ["elixir", "phoenix"]
        |> Enum.map(&Tag.changeset(%Tag{}, %{name: &1}))
        |> Enum.map(&Repo.insert/1)

      params = %{
        category: "book",
        tags: "elixir,phoenix,beginner",
        title: "title",
        content: "content",
      }
      {:ok, %{post: post}} = CreatePostService.call(user, params)

      [post: post, user: user]
    end

    test "has correct content", %{post: post} do
      assert "title" == post.title
      assert "content" == post.content
    end

    test "has correct user", %{post: post, user: user} do
      assert user.id == post.user_id
    end

    test "has correct category", %{post: post} do
      category = Repo.get(Category, post.category_id)
      assert "book" == category.name
    end

    test "has correct tags", %{post: post} do
      query = from t in Tag,
        left_join: pt in "posts_tags",
        where: pt.post_id == ^post.id and
               pt.tag_id == t.id,
        order_by: t.name
      tags = Repo.all(query)
      assert 3 == length(tags)
    end
  end
end

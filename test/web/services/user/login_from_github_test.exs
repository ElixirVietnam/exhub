defmodule ExHub.LoginFromGithubServiceTest do
  use ExHub.ModelCase

  alias ExHub.{User, AccessToken, Repo}
  alias ExHub.Services.User.LoginFromGithubService

  describe "new username" do
    setup do
      result = LoginFromGithubService.execute("new", "test@test.com", "an url")
      [result: result]
    end

    test "create new user" do
      assert 1 == Repo.aggregate(User, :count, :id)
    end

    test "creat new access token" do
      assert 1 == Repo.aggregate(AccessToken, :count, :id)
    end

    test "return correct token", %{result: result} do
      assert {:ok, result_token} = result
      token = Repo.one!(AccessToken)
      assert result_token == token.id
    end
  end

  describe "old username" do
    setup do
      user =
        %User{}
        |> User.changeset(%{
          username: "new", email: "test1@test.com", image_url: "aaa"
        })
        |> Repo.insert!

      result = LoginFromGithubService.execute("new", "test@test.com", "an url")
      [result: result, user: user]
    end

    test "does not create new user" do
      assert 1 == Repo.aggregate(User, :count, :id)
    end

    test "creat new access token" do
      assert 1 == Repo.aggregate(AccessToken, :count, :id)
    end

    test "return correct token", %{result: result, user: user} do
      assert {:ok, result_token} = result
      token = Repo.one!(AccessToken)
      assert result_token == token.id
      assert user.id == token.user_id
    end
  end
end

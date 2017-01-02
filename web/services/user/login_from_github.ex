defmodule ExHub.Services.User.LoginFromGithubService do
  @moduledoc """
  This service is used to generate access token for user

  This service needs to do 2 things:

  + find or create new user base in Github data
  + generate token for user

  At this time, we only allow user login with Github, but in future, we may
  change this.
  """
  alias ExHub.{User, AccessToken, Repo}

  def execute(username, email, image_url) do
    username
    |> find_or_create_user(email, image_url)
    |> generate_token
  end

  defp find_or_create_user(username, email, image_url) do
    case Repo.get_by(User, username: username) do
      nil ->
        params = %{username: username, email: email, image_url: image_url}
        result =
          %User{}
          |> User.changeset(params)
          |> Repo.insert

        case result do
          {:ok, user} -> {:ok, user}
          {:error, changeset} -> {:error, changeset}
        end
      user ->
        {:ok, user}
    end
  end

  # NOTE: we do not care about detail error at this point
  defp generate_token({:error, _}) do
    {:error, "Something wrong"}
  end
  defp generate_token({:ok, user}) do
    result =
      user
      |> AccessToken.user_changeset()
      |> Repo.insert

    case result do
      {:ok, token} -> {:ok, token.id}
      {:error, _} -> {:error, "Something wrong"}
    end
  end
end

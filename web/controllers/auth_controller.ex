defmodule ExHub.AuthController do
  @moduledoc """
  Auth controller responsible for handling Ueberauth responses
  """

  use ExHub.Web, :controller

  alias Ueberauth.Strategy.Helpers
  alias ExHub.Services.User.LoginFromGithubService

  plug Ueberauth


  def request(conn, _params) do
    redirect(conn, to: Helpers.callback_url(conn))
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    json(conn, %{"error": "Failed to authenticate."})
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, %{"provider" => "github"}) do
    username = auth.info.nickname
    email = auth.info.email
    image_url = auth.info.urls.avatar_url

    case LoginFromGithubService.execute(username, email, image_url) do
      {:ok, token} ->
        json(conn, %{"access_token": token})
      {:error, reason} ->
        json(conn, %{"error": reason})
    end
  end
end

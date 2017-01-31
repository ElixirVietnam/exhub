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
    redirect(conn, to: "/auth/github/frontend_callback?error=login+fail")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, %{"provider" => "github"}) do
    username = auth.info.nickname
    email = auth.info.email
    image_url = auth.info.urls.avatar_url

    case LoginFromGithubService.execute(username, email, image_url) do
      {:ok, token} ->
        redirect(conn, to: "/auth/github/frontend_callback?token=#{token}")
      {:error, reason} ->
        redirect(conn, to: "/auth/github/frontend_callback?error=#{reason}")
    end
  end
end

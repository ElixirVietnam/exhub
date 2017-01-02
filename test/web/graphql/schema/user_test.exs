defmodule ExHub.Graphql.Schema.UserTest do
  use Plug.Test
  use ExHub.ConnCase
  alias ExHub.{User, AccessToken, Notification, Repo}

  @default_user %{
    username: "test",
    email: "test@test.com",
    image_url: "url",
  }
  setup do
    user = %User{} |> User.changeset(@default_user) |> Repo.insert!
    token = AccessToken.user_changeset(user) |> Repo.insert!
    1..5
    |> Enum.map(fn _ -> Notification.changeset(user) end)
    |> Enum.each(&Repo.insert!/1)
    [user: user, token: token]
  end

  @normal_fields_query """
  query {
    currentUser {
      username,
      image_url
    }
  }
  """
  test "query normal fields", %{conn: conn, token: token} do
    conn = build_token_query(conn, token, @normal_fields_query)
    assert %{"data" => %{"currentUser" => user}} = json_response(conn, 200)
    assert "test" == user["username"]
    assert "url" == user["image_url"]
  end

  @notification_unseen_count_query """
  query {
    currentUser {
      notification_unseen_count
    }
  }
  """
  test "query notification_unseen_count", %{conn: conn, token: token} do
    conn = build_token_query(conn, token, @notification_unseen_count_query)
    assert %{"data" => %{"currentUser" => user}} = json_response(conn, 200)
    assert 5 == user["notification_unseen_count"]
  end

  @list_notifications_query """
  query {
    currentUser {
      notifications(first: 10) {
        edges {
          node {
            content
            is_seen
          }
        }
      }
    }
  }
  """
  test "query list notification", %{conn: conn, token: token} do
    conn = build_token_query(conn, token, @list_notifications_query)
    assert %{
      "data" => %{
        "currentUser" => %{
          "notifications" => %{
            "edges" => data
          }
        }
      }
    } = json_response(conn, 200)
    assert 5 = length(data)
  end
end

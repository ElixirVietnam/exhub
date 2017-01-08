defmodule ExHub.Graphql.Schema.UserSchema do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation
  use Absinthe.Ecto, repo: ExHub.Repo
  use ExHub.Graphql.Ecto
  alias ExHub.Graphql.Resolver
  alias ExHub.{Notification, Repo}

  connection node_type: :user

  object :user do
    field :username, :string
    field :image_url, :string

    @desc """
    Get all notifications of user.
    """
    connection field :notifications, node_type: :notification do
      resolve list(&Notification.all_query/3)
              |> Resolver.is_authenticated
    end

    @desc """
    Number of unseen notifications. As soon as user call API to get
    all notification, `notification_unseen_count` will be reset to 0
    """
    field :notification_unseen_count, :integer do
      resolve (fn user, args, info ->
        count =
          user
          |> Notification.unseen_query(args, info)
          |> Repo.aggregate(:count, :id)
        {:ok, count}
      end)
      |> Resolver.permission([:owner])
    end
  end

  object :user_queries do
    @desc """
    Get current user
    """
    field :current_user, :user do
      resolve (fn _, _, %{context: %{current_user: user}} ->
        {:ok, user}
      end)
      |> Resolver.is_authenticated
    end
  end
end

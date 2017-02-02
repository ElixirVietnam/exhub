defmodule ExHub.Graphql.Resolver.Post do
  @moduledoc false

  alias ExHub.Services.Post

  def create_post(_parent, args, %{context: %{current_user: user}} = _info) do
    Post.CreatePostService.call(user, args)
  end
end

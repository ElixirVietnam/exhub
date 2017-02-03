defmodule ExHub.Graphql.Resolver.Comment do
  @moduledoc false

  alias ExHub.Services.Comment

  def create_comment(_parent, args, %{context: %{current_user: user}} = _info) do
    Comment.CreateCommentService.call(user, args)
  end
end


defmodule ExHub.Graphql.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema

  node interface do
    resolve_type fn
      _ -> :unknown
    end
  end

  import_types ExHub.Graphql.Schema.PostSchema
  import_types ExHub.Graphql.Schema.TagSchema
  import_types ExHub.Graphql.Schema.CategorySchema
  import_types ExHub.Graphql.Schema.NotificationSchema
  import_types ExHub.Graphql.Schema.CommentSchema
  import_types ExHub.Graphql.Schema.UserSchema

  query do
    import_fields :user_queries
    import_fields :category_queries
    import_fields :tag_queries
    import_fields :post_queries
  end

  mutation do
    import_fields :post_mutations
    import_fields :comment_mutations
  end
end

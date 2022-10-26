// database design:
tables:

1. users {id:,username:,email:,password:,remember_me_token:,}
2. projects {id:,name:,description:,status_id:,}
3. tasks {id:,name:,description:,due_at:,status_id:,created_by:ref,assigned_to:ref}
4. project_tasks{id:,}
5. project_users {id:,project_id:,user_id:,role_id:,} =>> 'prject_users' table 'projects' and 'users' table er junction table. akhane table duitar akta connection toiri hoyese. @manyToMany hooks er maddome Project mod

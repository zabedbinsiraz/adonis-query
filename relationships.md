// I want to make a relation between user and task and it's a one-to-many relation

// in User model i need to include these hooks

@hasMany(()=>Task,{
foreignKey: 'createdBy'
})
public tasks: HasMany <typeof Task>

@hasMany(()=>Task,{
foreignKey: 'assignedTo'
})
public assignedTasks: HasMany <typeof Task>

@manyToMany(()=>Project)
public projects: ManyToMany<typeof Project>

// in Task model i need to include these hooks

@column()
public createdBy:number
@column()
public assignedTo:number

@belongsTo(()=>User,{
localKey: 'createdBy'
})
public creator: BelongsTo<typeof User>

@belongsTo(()=>User,{
localKey: 'assignedTo'
})
public assignee: BelongsTo<typeof User>

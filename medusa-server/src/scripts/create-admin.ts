import { MedusaContainer } from "@medusajs/framework/types"

export default async function createAdmin({ container }: { container: MedusaContainer }) {
  const userModuleService = container.resolve("user")
  const authModuleService = container.resolve("auth")

  const email = "eliasbatlle@gmail.com"
  const password = "1043114905ELi@$"
  const firstName = "Supragamess"

  // Remove existing user if any
  const existingUsers = await userModuleService.listUsers({ email })
  if (existingUsers.length > 0) {
    await userModuleService.softDeleteUsers([existingUsers[0].id])
    console.log("Removed existing user")
  }

  // Register auth identity (creates hashed password in provider_metadata)
  const result = await authModuleService.register("emailpass", {
    actor_type: "user",
    body: { email, password },
  } as any)

  if (!result.success) {
    console.error("Failed to register auth identity:", result.error)
    return
  }

  const authIdentityId = result.authIdentity.id
  console.log("Auth identity created:", authIdentityId)

  // Create user record
  const user = await userModuleService.createUsers({
    email,
    first_name: firstName,
  })

  console.log("User created:", user.id)

  // Link user to auth identity via app_metadata
  await authModuleService.updateAuthIdentities({
    id: authIdentityId,
    app_metadata: { user_id: user.id },
  })

  console.log("Auth identity linked to user")
  console.log("Admin user created: Supragamess (eliasbatlle@gmail.com)")
}

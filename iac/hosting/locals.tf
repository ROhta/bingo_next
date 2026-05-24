locals {
  # Unix ms timestamp at which Vercel will auto-disable Attack Challenge Mode.
  # Required by vercel provider v5; set to 2100-01-01 UTC so the mode stays on indefinitely.
  attack_mode_active_until_ms = 4102444800000
}

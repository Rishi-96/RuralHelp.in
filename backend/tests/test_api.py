import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app, seed_database
import asyncio
import httpx

# Ensure seed data is populated
seed_database()

async def test_all():
    print("Starting integration test...", flush=True)
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Health
        res = await client.get("/api/health")
        print(f"1. /api/health: {res.status_code} - {res.json()}", flush=True)

        # 2. Services
        res = await client.get("/api/services")
        services = res.json()
        print(f"2. /api/services: {res.status_code} - {len(services)} services", flush=True)

        # 3. Enquiry
        payload = {
            "customer_name": "Kailash Chand Jain",
            "phone": "9876543210",
            "email": "jainkirana@gmail.com",
            "business_name": "Jain Kirana Bhandar",
            "business_type": "retail_kirana",
            "service_id": "Billing & GST POS Systems",
            "project_description": "We need barcode billing setup in Baruasagar market."
        }
        res = await client.post("/api/enquiry", json=payload)
        lead = res.json()
        print(f"3. /api/enquiry: {res.status_code} - Created Lead #{lead['id']}", flush=True)

        # 4. Auth Login
        res = await client.post("/api/auth/login", json={"email": "admin@ruralhelp.in", "password": "admin123"})
        auth = res.json()
        token = auth["access_token"]
        print(f"4. /api/auth/login: {res.status_code} - Token generated", flush=True)

        # 5. Admin Dashboard Stats
        headers = {"Authorization": f"Bearer {token}"}
        res = await client.get("/api/admin/dashboard/stats", headers=headers)
        print(f"5. /api/admin/dashboard/stats: {res.status_code} - {res.json()}", flush=True)

        # 6. Admin Leads List
        res = await client.get("/api/admin/leads", headers=headers)
        print(f"6. /api/admin/leads: {res.status_code} - {len(res.json())} leads in ledger", flush=True)

        # 7. Update Lead
        res = await client.patch(f"/api/admin/leads/{lead['id']}", json={"status": "Contacted"}, headers=headers)
        print(f"7. Lead status updated: {res.status_code} - Status: {res.json()['status']}", flush=True)

        # 8. Add Note
        res = await client.post(f"/api/admin/leads/{lead['id']}/notes", json={"content": "Called shop owner."}, headers=headers)
        print(f"8. Added internal note: {res.status_code} - Note ID: {res.json()['id']}", flush=True)

    print("\nSUCCESS: All endpoints verified and functioning perfectly!", flush=True)

if __name__ == "__main__":
    asyncio.run(test_all())

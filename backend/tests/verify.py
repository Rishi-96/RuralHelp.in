import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import SessionLocal
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadUpdate, NoteCreate
from app.schemas.auth import LoginRequest
from app.routes.public import health_check, submit_enquiry, list_services
from app.routes.auth import login
from app.routes.admin_leads import get_all_leads, get_dashboard_stats, update_lead, add_lead_note

def run_direct_tests():
    print("=============================================================")
    print("RURALHELP BACKEND VERIFICATION & DATABASE TESTS")
    print("=============================================================")
    db = SessionLocal()

    try:
        # 1. Health check
        health = health_check()
        print("1. Health Check Response:", health)
        assert health["status"] == "healthy"
        assert "Baruasagar" in health["territory"]
        print("✓ Health check PASSED\n")

        # 2. List Services
        services = list_services(db=db)
        print(f"2. Services in Database: {len(services)} services")
        for s in services:
            print(f"   - [{s.slug}] {s.title} ({s.category.name if s.category else 'General'})")
        assert len(services) >= 6
        print("✓ Services listing PASSED\n")

        # 3. Submit Enquiry (Lead creation & validation)
        enquiry_in = LeadCreate(
            customer_name="Kailash Chand Jain",
            phone="9876543210",
            email="jainkirana@gmail.com",
            business_name="Jain Kirana Bhandar",
            business_type="retail_kirana",
            service_id="Billing & GST POS Systems",
            project_description="Need fast barcode machine for Baruasagar market shop."
        )
        new_lead = submit_enquiry(lead_in=enquiry_in, db=db)
        print(f"3. New Lead Created in DB: ID #{new_lead.id} - {new_lead.customer_name} ({new_lead.business_name})")
        assert new_lead.id is not None
        assert new_lead.status == "New"
        print("✓ Public Lead Submission & Validation PASSED\n")

        # 4. Authentication & Security
        auth_req = LoginRequest(email="admin@ruralhelp.in", password="admin123")
        token_res = login(request=auth_req, db=db)
        print(f"4. Admin Login Successful: Token generated ({token_res.token_type})")
        print(f"   Logged in as: {token_res.user.full_name} ({token_res.user.email}) - Role: {token_res.user.role}")
        assert token_res.access_token is not None
        print("✓ Admin Authentication & Password Hashing PASSED\n")

        # Get the admin user object for protected endpoints
        from app.models.user import User
        admin_user = db.query(User).filter(User.email == "admin@ruralhelp.in").first()

        # 5. Dashboard Stats
        stats = get_dashboard_stats(db=db, current_user=admin_user)
        print("5. Admin Dashboard Analytics:", stats)
        assert stats["total_leads"] >= 4
        print("✓ Admin Dashboard Analytics PASSED\n")

        # 6. Admin Leads Ledger Query
        all_leads = get_all_leads(status=None, search=None, db=db, current_user=admin_user)
        print(f"6. Total Leads in Ledger: {len(all_leads)}")
        assert len(all_leads) >= 4
        print("✓ Admin Leads Query PASSED\n")

        # 7. Update Lead Status
        update_data = LeadUpdate(status="Contacted", follow_up_date="2026-11-22")
        updated_lead = update_lead(id=new_lead.id, update_data=update_data, db=db, current_user=admin_user)
        print(f"7. Lead #{updated_lead.id} Status Updated to: {updated_lead.status} (Follow-up: {updated_lead.follow_up_date})")
        assert updated_lead.status == "Contacted"
        print("✓ Status Workflow Transition PASSED\n")

        # 8. Add Internal Field Note
        note_in = NoteCreate(content="Visited Mr. Jain in Baruasagar. Demonstrated 3-second barcode billing. Agreed to install on Monday.")
        note = add_lead_note(id=new_lead.id, note_in=note_in, db=db, current_user=admin_user)
        print(f"8. Internal Note Added by {note.author_name}: '{note.content}'")
        assert note.id is not None
        print("✓ Internal Lead Notes & Audit Trail PASSED\n")

        print("=============================================================")
        print("ALL 8 FULL-STACK BACKEND & DATABASE TESTS COMPLETED 100%!")
        print("=============================================================")

    finally:
        db.close()

if __name__ == "__main__":
    run_direct_tests()

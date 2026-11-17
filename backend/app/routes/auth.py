from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse, UserOut
from app.auth.security import verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive account")

    access_token = create_access_token(data={"sub": user.email, "role": user.role.name if user.role else "Admin"})
    
    user_out = UserOut(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        role=user.role.name if user.role else "Super Admin",
        is_active=user.is_active,
    )

    return TokenResponse(access_token=access_token, token_type="bearer", user=user_out)

@router.get("/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(get_current_user)):
    return UserOut(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        role=current_user.role.name if current_user.role else "Super Admin",
        is_active=current_user.is_active,
    )

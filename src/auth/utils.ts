import { type AuthState } from "./types";
import { connect } from "@/app/store/store";

export const withUser = connect((state: AuthState) => ({ user: state.auth?.user?.data ?? {} }));

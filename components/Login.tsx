import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "./Account";
import { Card } from "antd";

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <Card style={{ width: 300 }} className="custom-card">
          <h4 className="text-center">Login</h4>
          {!session ? (
            <Auth
              supabaseClient={supabase}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Email",
                    password_label: "Password",
                    button_label: "Submit",
                    social_provider_text: "Or continue with",
                    // link_text: "",
                  },
                  sign_up: {
                    email_label: "Email",
                    password_label: "Password",
                    email_input_placeholder: "",
                    password_input_placeholder: "",
                    button_label: "Submit",
                    social_provider_text: "Or continue with",
                    // link_text: "",
                  },
                },
              }}
              // appearance={{ theme: ThemeSupa }}
              theme="light"
            />
          ) : (
            <Account session={session} />
          )}
        </Card>
      </main>
    </>
  );
};

export default Login;

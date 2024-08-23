import React from 'react';
import {Button} from "@/components/ui/button";

const AuthBtn = () => {
    return (
        <div className="items-center gap-2 hidden lg:flex">
            <Button
                variant="outline"
                className="text-blue-950 border-blue-950"
            >
                Login
            </Button>
            <Button
                className="text-white bg-blue-950"
            >
                Register
            </Button>
        </div>
    );
};

export default AuthBtn;
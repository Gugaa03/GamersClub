module.exports = [
"[project]/pages/profile.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/AuthContext.tsx [ssr] (ecmascript)");
"use client";
;
;
;
;
const InputField = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].memo(({ type = "text", placeholder, value, onChange })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
        type: type,
        placeholder: placeholder,
        value: value,
        onChange: onChange,
        className: "w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
    }, void 0, false, {
        fileName: "[project]/pages/profile.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
const FormSection = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].memo(({ title, children, buttonText, onSubmit, loading = false, colorClass = "bg-blue-600" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4 hover:shadow-2xl transition-shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold",
                children: title
            }, void 0, false, {
                fileName: "[project]/pages/profile.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: children
            }, void 0, false, {
                fileName: "[project]/pages/profile.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: onSubmit,
                disabled: loading,
                className: `${colorClass} hover:${colorClass.replace("600", "700")} px-6 py-3 rounded-xl w-full font-bold transition-all shadow-md hover:shadow-lg`,
                children: loading ? "Atualizando..." : buttonText
            }, void 0, false, {
                fileName: "[project]/pages/profile.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/pages/profile.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
function ProfilePage() {
    const { user, logout, updateEmail, updatePassword } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [newEmail, setNewEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [oldPassword, setOldPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [loadingEmail, setLoadingEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [loadingPassword, setLoadingPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-xl font-semibold animate-pulse",
                children: "⚠️ Faça login para editar o perfil."
            }, void 0, false, {
                fileName: "[project]/pages/profile.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/profile.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this);
    }
    const handleEmailUpdate = async ()=>{
        if (!newEmail) return alert("Digite um novo email");
        if (!newEmail.includes("@")) return alert("Email inválido! Certifique-se de incluir '@'");
        setLoadingEmail(true);
        try {
            await updateEmail(newEmail);
            setNewEmail("");
        } catch (err) {
            console.error("❌ Erro ao atualizar email:", err);
            alert("Erro ao atualizar email: " + err.message);
        }
        setLoadingEmail(false);
    };
    const handlePasswordUpdate = async ()=>{
        if (!oldPassword || !newPassword || !confirmPassword) return alert("Preencha todos os campos");
        if (newPassword !== confirmPassword) return alert("A nova senha e a confirmação não coincidem");
        setLoadingPassword(true);
        try {
            await updatePassword(oldPassword, newPassword, confirmPassword);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error("❌ Erro ao atualizar senha:", err);
            alert("Erro ao atualizar senha: " + err.message);
        }
        setLoadingPassword(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-10 flex justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "w-full max-w-2xl space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 animate-gradient-x",
                    children: "Editar Perfil"
                }, void 0, false, {
                    fileName: "[project]/pages/profile.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-gray-800 p-6 rounded-3xl shadow-xl space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                    children: "Usuário:"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.tsx",
                                    lineNumber: 121,
                                    columnNumber: 34
                                }, this),
                                " ",
                                user.email
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                    children: "Saldo:"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.tsx",
                                    lineNumber: 122,
                                    columnNumber: 34
                                }, this),
                                " €",
                                user.balance.toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/profile.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FormSection, {
                    title: "Alterar Email",
                    buttonText: "Atualizar Email",
                    onSubmit: handleEmailUpdate,
                    loading: loadingEmail,
                    colorClass: "bg-blue-600",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(InputField, {
                        type: "email",
                        placeholder: "Novo email",
                        value: newEmail,
                        onChange: (e)=>setNewEmail(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/profile.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FormSection, {
                    title: "Alterar Senha",
                    buttonText: "Atualizar Senha",
                    onSubmit: handlePasswordUpdate,
                    loading: loadingPassword,
                    colorClass: "bg-green-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(InputField, {
                            type: "password",
                            placeholder: "Senha antiga",
                            value: oldPassword,
                            onChange: (e)=>setOldPassword(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(InputField, {
                            type: "password",
                            placeholder: "Nova senha",
                            value: newPassword,
                            onChange: (e)=>setNewPassword(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(InputField, {
                            type: "password",
                            placeholder: "Confirmar nova senha",
                            value: confirmPassword,
                            onChange: (e)=>setConfirmPassword(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/profile.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: logout,
                    className: "bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl w-full font-bold transition-all shadow-md hover:shadow-lg",
                    children: "Sair da Conta"
                }, void 0, false, {
                    fileName: "[project]/pages/profile.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/profile.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/profile.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c04ba365._.js.map
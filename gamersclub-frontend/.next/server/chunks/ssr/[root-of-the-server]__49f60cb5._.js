module.exports = [
"[project]/pages/add-funds.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddFundsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/AuthContext.tsx [ssr] (ecmascript)");
"use client";
;
;
;
const predefinedAmounts = [
    5,
    10,
    20,
    50
];
function AddFundsPage() {
    const { user, addFunds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [selectedAmount, setSelectedAmount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("selectAmount");
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("card");
    const [cardNumber, setCardNumber] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [cardExpiry, setCardExpiry] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [cardCVV, setCardCVV] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [paypalEmail, setPaypalEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleProceedToPayment = ()=>{
        if (!selectedAmount) return alert("Escolha um valor primeiro!");
        setStep("payment");
    };
    const handleAddFunds = async ()=>{
        if (!user) return alert("Você precisa estar logado.");
        if (paymentMethod === "card") {
            if (cardNumber.length < 12) return alert("Número de cartão inválido!");
            if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) return alert("Data de validade inválida (MM/AA)!");
            if (cardCVV.length < 3) return alert("CVV inválido!");
        }
        if (paymentMethod === "paypal" && !paypalEmail.includes("@")) {
            return alert("Email PayPal inválido!");
        }
        setLoading(true);
        try {
            await addFunds(selectedAmount);
            alert(`€${selectedAmount.toFixed(2)} adicionados à sua conta!`);
            setSelectedAmount(null);
            setCardNumber("");
            setCardExpiry("");
            setCardCVV("");
            setPaypalEmail("");
            setStep("selectAmount");
        } catch (error) {
            console.error("Erro ao adicionar fundos:", error);
            alert("Ocorreu um erro. Tente novamente.");
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent",
                children: "💳 Adicionar Fundos"
            }, void 0, false, {
                fileName: "[project]/pages/add-funds.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "bg-gray-800/60 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6",
                children: [
                    step === "selectAmount" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mb-4",
                                children: "Escolha um valor"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 flex-wrap",
                                children: predefinedAmounts.map((amount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedAmount(amount),
                                        className: `px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-md ${selectedAmount === amount ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`,
                                        children: [
                                            "€",
                                            amount
                                        ]
                                    }, amount, true, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleProceedToPayment,
                                disabled: !selectedAmount,
                                className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-5 py-3 rounded-xl font-bold text-lg transition transform hover:scale-105 disabled:opacity-50 mt-6",
                                children: "Avançar para Pagamento →"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    step === "payment" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mb-4",
                                children: "Método de pagamento"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-between gap-4 mb-6",
                                children: [
                                    "card",
                                    "paypal"
                                ].map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPaymentMethod(method),
                                        className: `flex-1 px-5 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${paymentMethod === method ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`,
                                        children: method === "card" ? "💳 Cartão" : "🅿️ PayPal"
                                    }, method, false, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            paymentMethod === "card" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Número do cartão",
                                        value: cardNumber,
                                        onChange: (e)=>setCardNumber(e.target.value),
                                        className: "w-full px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Validade (MM/AA)",
                                                value: cardExpiry,
                                                onChange: (e)=>setCardExpiry(e.target.value),
                                                className: "w-1/2 px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/add-funds.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "CVV",
                                                value: cardCVV,
                                                onChange: (e)=>setCardCVV(e.target.value),
                                                className: "w-1/2 px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/add-funds.tsx",
                                                lineNumber: 127,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            paymentMethod === "paypal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "email",
                                placeholder: "Email do PayPal",
                                value: paypalEmail,
                                onChange: (e)=>setPaypalEmail(e.target.value),
                                className: "w-full px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white mb-4"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleAddFunds,
                                disabled: loading,
                                className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-5 py-3 rounded-xl font-bold text-lg transition transform hover:scale-105 disabled:opacity-50",
                                children: loading ? "Processando..." : `Confirmar pagamento de €${selectedAmount?.toFixed(2)}`
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStep("selectAmount"),
                                className: "w-full mt-3 bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg text-white font-semibold transition",
                                children: "← Voltar"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/add-funds.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/add-funds.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__49f60cb5._.js.map
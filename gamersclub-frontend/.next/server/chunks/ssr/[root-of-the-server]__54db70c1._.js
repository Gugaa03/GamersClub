module.exports = [
"[externals]/react-svg-credit-card-payment-icons [external] (react-svg-credit-card-payment-icons, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-svg-credit-card-payment-icons", () => require("react-svg-credit-card-payment-icons"));

module.exports = mod;
}),
"[project]/pages/add-funds.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddFundsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/AuthContext.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons__$5b$external$5d$__$28$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react-svg-credit-card-payment-icons [external] (react-svg-credit-card-payment-icons, cjs)");
"use client";
;
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
            addFunds(selectedAmount);
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
    const paymentIcons = {
        card: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons__$5b$external$5d$__$28$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2c$__cjs$29$__["PaymentIcon"], {
            type: "card",
            className: "w-6 h-6 mr-2"
        }, void 0, false, {
            fileName: "[project]/pages/add-funds.tsx",
            lineNumber: 56,
            columnNumber: 11
        }, this),
        paypal: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons__$5b$external$5d$__$28$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2c$__cjs$29$__["PaymentIcon"], {
            type: "paypal",
            className: "w-6 h-6 mr-2"
        }, void 0, false, {
            fileName: "[project]/pages/add-funds.tsx",
            lineNumber: 57,
            columnNumber: 13
        }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold mb-8",
                children: "Adicionar Fundos"
            }, void 0, false, {
                fileName: "[project]/pages/add-funds.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6",
                children: [
                    step === "selectAmount" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mb-2",
                                children: "Escolha um valor"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 flex-wrap",
                                children: predefinedAmounts.map((amount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedAmount(amount),
                                        className: `px-5 py-2 rounded-lg font-semibold transition ${selectedAmount === amount ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`,
                                        children: [
                                            "€",
                                            amount
                                        ]
                                    }, amount, true, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleProceedToPayment,
                                disabled: !selectedAmount,
                                className: "w-full bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold text-lg transition disabled:opacity-50 mt-4",
                                children: "Avançar para Pagamento"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    step === "payment" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mb-2",
                                children: "Método de pagamento"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-between gap-4 mb-4",
                                children: [
                                    "card",
                                    "paypal"
                                ].map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPaymentMethod(method),
                                        className: `flex items-center flex-1 px-4 py-3 rounded-lg font-semibold transition gap-2 ${paymentMethod === method ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`,
                                        children: [
                                            paymentIcons[method],
                                            method === "card" ? "Cartão" : "PayPal"
                                        ]
                                    }, method, true, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            paymentMethod === "card" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Número do cartão",
                                        value: cardNumber,
                                        onChange: (e)=>setCardNumber(e.target.value),
                                        className: "w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Validade (MM/AA)",
                                        value: cardExpiry,
                                        onChange: (e)=>setCardExpiry(e.target.value),
                                        className: "w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "CVV",
                                        value: cardCVV,
                                        onChange: (e)=>setCardCVV(e.target.value),
                                        className: "w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/add-funds.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            paymentMethod === "paypal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "email",
                                placeholder: "Email do PayPal",
                                value: paypalEmail,
                                onChange: (e)=>setPaypalEmail(e.target.value),
                                className: "w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none mb-4"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleAddFunds,
                                disabled: loading,
                                className: "w-full bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold text-lg transition disabled:opacity-50",
                                children: loading ? "Processando..." : `Adicionar €${selectedAmount?.toFixed(2)}`
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStep("selectAmount"),
                                className: "w-full mt-2 bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg text-white font-semibold",
                                children: "Voltar"
                            }, void 0, false, {
                                fileName: "[project]/pages/add-funds.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/add-funds.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/add-funds.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__54db70c1._.js.map
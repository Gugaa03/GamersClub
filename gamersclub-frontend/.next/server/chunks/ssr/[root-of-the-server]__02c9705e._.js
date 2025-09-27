module.exports = [
"[project]/pages/Checkout.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/AuthContext.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$CardContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/CardContext.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [ssr] (ecmascript)");
"use client";
;
;
;
;
;
function CheckoutPage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { cart, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$CardContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Garante que, se o cart estiver vazio, tente carregar do localStorage
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (cart.length === 0) {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                clearCart(); // Limpa antes de adicionar
                localStorage.setItem("cart", JSON.stringify(parsed));
            }
        }
    }, []);
    const totalPrice = cart.reduce((acc, g)=>acc + (g.price || 0), 0);
    const handlePurchase = async ()=>{
        if (!user) return alert("Faça login primeiro!");
        if (!user.id) return alert("Usuário sem ID definido.");
        if ((user.balance || 0) < totalPrice) return alert("Saldo insuficiente!");
        setLoading(true);
        try {
            // Registrar todas as compras
            const inserts = cart.map((game)=>({
                    user_id: user.id,
                    game_id: game.id,
                    price: Number(game.price)
                }));
            const { error: purchaseError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from("purchases").insert(inserts);
            if (purchaseError) throw purchaseError;
            console.log("✅ Compras registradas no Supabase", inserts);
            // Atualiza saldo diretamente
            const newBalance = (user.balance || 0) - totalPrice;
            const { error: balanceError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from("users").update({
                balance: newBalance
            }).eq("id", user.id);
            if (balanceError) throw balanceError;
            console.log("💰 Saldo atualizado:", newBalance);
            // Enviar email de recibo
            try {
                const response = await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        recipient: user.email,
                        subject: "Recibo da sua compra",
                        html: `<h1>Obrigado pela compra!</h1>
                   <p>Você comprou os seguintes jogos:</p>
                   <ul>
                     ${cart.map((g)=>`<li>${g.title} - €${g.price.toFixed(2)}</li>`).join("")}
                   </ul>
                   <p>Total: €${totalPrice.toFixed(2)}</p>`
                    })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Erro ao enviar email");
                console.log("📧 Email de recibo enviado com sucesso:", data);
            } catch (emailErr) {
                console.error("❌ Erro ao enviar email de recibo:", emailErr);
            }
            // Limpa carrinho usando o método do contexto
            clearCart();
            alert("Compra realizada com sucesso!");
        } catch (err) {
            console.error("❌ Erro ao registrar compra:", err);
            alert("Erro ao registrar a compra.");
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 text-white p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6",
                children: "Checkout"
            }, void 0, false, {
                fileName: "[project]/pages/Checkout.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    cart.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-gray-400",
                        children: "Seu carrinho está vazio."
                    }, void 0, false, {
                        fileName: "[project]/pages/Checkout.tsx",
                        lineNumber: 94,
                        columnNumber: 31
                    }, this),
                    cart.map((game)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between bg-gray-800 p-4 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: game.image,
                                    className: "w-16 h-16 object-cover rounded"
                                }, void 0, false, {
                                    fileName: "[project]/pages/Checkout.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    children: game.title
                                }, void 0, false, {
                                    fileName: "[project]/pages/Checkout.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    children: [
                                        "€",
                                        game.price.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/Checkout.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, game.id, true, {
                            fileName: "[project]/pages/Checkout.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Checkout.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-6 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "text-xl font-bold",
                        children: [
                            "Total: €",
                            totalPrice.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Checkout.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: handlePurchase,
                        disabled: loading || cart.length === 0,
                        className: "bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold transition disabled:opacity-50",
                        children: loading ? "Processando..." : "Comprar"
                    }, void 0, false, {
                        fileName: "[project]/pages/Checkout.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Checkout.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/Checkout.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02c9705e._.js.map
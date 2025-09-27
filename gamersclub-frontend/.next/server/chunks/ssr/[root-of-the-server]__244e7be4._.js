module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@supabase/supabase-js", () => require("@supabase/supabase-js"));

module.exports = mod;
}),
"[project]/lib/supabaseClient.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs)");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://iwfsrypsxddfkdpcfmfn.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3ZnNyeXBzeGRkZmtkcGNmbWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTM0MzksImV4cCI6MjA3MzkyOTQzOX0.-3tvNTXLuA9R7oz9gwmn27e-3MwJNKYP8rdSOPNQM_M");
const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$29$__["createClient"])(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});
}),
"[project]/lib/AuthContext.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])({
    user: null,
    login: ()=>{},
    logout: ()=>{},
    addFunds: async ()=>{},
    refreshBalance: async ()=>{},
    updateProfile: async ()=>{},
    updateEmail: async ()=>{},
    updatePassword: async ()=>{}
});
const AuthProvider = ({ children })=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const API_BASE = "http://localhost:4000/api/updateUser";
    // 🔹 Restaurar sessão do localStorage
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            setUser(parsed);
        }
    }, []);
    // 🔹 Função de login (mantida como tu tens)
    const login = (userData)=>{
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    // 🔹 Função de logout
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("user");
    };
    // 🔹 Atualiza o balance do usuário a partir do Supabase
    const refreshBalance = async ()=>{
        if (!user?.id) return;
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from("users").select("balance").eq("id", user.id).single();
            if (error) {
                console.error("❌ Erro ao buscar saldo:", error);
                return;
            }
            if (data && typeof data.balance === "number") {
                const updatedUser = {
                    ...user,
                    balance: data.balance
                };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        } catch (err) {
            console.error("❌ Erro ao atualizar saldo do usuário:", err);
        }
    };
    // 🔹 Função de adicionar fundos
    const addFunds = async (amount)=>{
        if (!user?.id) return alert("Usuário não definido ou sem ID!");
        const newBalance = (user.balance || 0) + amount;
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from("users").update({
                balance: newBalance
            }).eq("id", user.id);
            if (error) throw error;
            const updatedUser = {
                ...user,
                balance: newBalance
            };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            console.log(`💵 Fundos adicionados: €${amount.toFixed(2)}. Novo saldo: €${newBalance.toFixed(2)}`);
        } catch (err) {
            console.error("❌ Erro ao adicionar fundos:", err);
            alert("Erro ao atualizar saldo no Supabase.");
        }
    };
    // 🔹 Atualizar perfil
    const updateProfile = async (updates)=>{
        if (!user?.id) return alert("Usuário não definido!");
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from("users").update(updates).eq("id", user.id);
            if (error) throw error;
            const updatedUser = {
                ...user,
                ...updates
            };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert("Perfil atualizado com sucesso!");
            console.log("✏️ Perfil atualizado:", updatedUser);
        } catch (err) {
            console.error("❌ Erro ao atualizar perfil:", err);
            alert("Erro ao atualizar perfil: " + err);
        }
    };
    // 🔹 Atualizar email
    const updateEmail = async (newEmail)=>{
        if (!user?.id) return alert("Usuário não definido");
        try {
            const res = await fetch(`${API_BASE}/email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id,
                    newEmail
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao atualizar email");
            const updatedUser = {
                ...user,
                email: newEmail
            };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert(data.message);
            console.log("📧 Email atualizado:", updatedUser);
        } catch (err) {
            console.error("❌ Erro ao atualizar email:", err);
            alert("Erro ao atualizar email: " + err.message);
        }
    };
    // 🔹 Atualizar senha
    const updatePassword = async (oldPassword, newPassword, confirmPassword)=>{
        if (!user?.id) return alert("Usuário não definido");
        try {
            const res = await fetch(`${API_BASE}/password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id,
                    oldPassword,
                    newPassword,
                    confirmPassword
                })
            });
            const data = await res.json();
            if (!res.ok) return alert("Erro: " + data.error);
            alert(data.message);
            console.log("🔒 Senha atualizada com sucesso");
        } catch (err) {
            console.error("❌ Erro ao atualizar senha:", err);
            alert("Erro ao atualizar senha: " + err.message);
        }
    };
    // Sempre que o usuário muda, atualiza saldo
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (user?.id) {
            refreshBalance();
        }
    }, [
        user?.id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            login,
            logout,
            addFunds,
            refreshBalance,
            updateProfile,
            updateEmail,
            updatePassword
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/AuthContext.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useAuth = ()=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(AuthContext);
}),
"[project]/lib/CardContext.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])({
    cart: [],
    addToCart: ()=>{},
    removeFromCart: ()=>{},
    clearCart: ()=>{}
});
const CartProvider = ({ children })=>{
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);
    const addToCart = (game)=>{
        console.log("➕ Adicionando ao carrinho:", game);
        const exists = cart.find((g)=>g.id === game.id);
        if (!exists) {
            const newCart = [
                ...cart,
                game
            ];
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };
    const removeFromCart = (id)=>{
        const newCart = cart.filter((g)=>g.id !== id);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };
    const clearCart = ()=>{
        setCart([]);
        localStorage.removeItem("cart");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            addToCart,
            removeFromCart,
            clearCart
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/CardContext.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useCart = ()=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(CartContext);
}),
"[project]/components/CartSidebar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartSidebar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$CardContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/CardContext.tsx [ssr] (ecmascript)");
"use client";
;
;
;
;
function CartSidebar({ isOpen, setIsOpen }) {
    const { cart, removeFromCart, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$CardContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const total = cart.reduce((sum, g)=>sum + g.price, 0).toFixed(2);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `fixed top-0 right-0 w-80 h-screen bg-gray-900 shadow-lg transform transition-transform z-50 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-bold",
                        children: "Carrinho"
                    }, void 0, false, {
                        fileName: "[project]/components/CartSidebar.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsOpen(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-5 h-5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/CartSidebar.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CartSidebar.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CartSidebar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4",
                children: cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-gray-300 text-center mt-4",
                    children: "Seu carrinho está vazio."
                }, void 0, false, {
                    fileName: "[project]/components/CartSidebar.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this) : cart.map((game)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 bg-gray-800 p-2 rounded-lg mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: game.image,
                                alt: game.title,
                                className: "w-16 h-16 object-cover rounded"
                            }, void 0, false, {
                                fileName: "[project]/components/CartSidebar.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-white font-semibold",
                                        children: game.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/CartSidebar.tsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400",
                                        children: [
                                            "€",
                                            game.price.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CartSidebar.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CartSidebar.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>removeFromCart(game.id),
                                className: "text-red-500 hover:text-red-400",
                                children: "Remover"
                            }, void 0, false, {
                                fileName: "[project]/components/CartSidebar.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        ]
                    }, game.id, true, {
                        fileName: "[project]/components/CartSidebar.tsx",
                        lineNumber: 38,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CartSidebar.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-gray-700 flex flex-col gap-2 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-white font-bold text-lg",
                        children: [
                            "Total: €",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CartSidebar.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/Checkout",
                        className: `block w-full text-center py-2 rounded-lg font-semibold transition-colors ${cart.length === 0 ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
                        onClick: ()=>setIsOpen(false),
                        children: "Finalizar Compra"
                    }, void 0, false, {
                        fileName: "[project]/components/CartSidebar.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: clearCart,
                        disabled: cart.length === 0,
                        className: `w-full py-2 rounded-lg font-semibold transition-colors ${cart.length === 0 ? "bg-gray-700 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`,
                        children: "Limpar Carrinho"
                    }, void 0, false, {
                        fileName: "[project]/components/CartSidebar.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CartSidebar.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CartSidebar.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Navbar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/AuthContext.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CartSidebar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CartSidebar.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const genres = [
    "Ação",
    "Aventura",
    "RPG",
    "Indie",
    "Simulação",
    "Esportes"
];
function Navbar() {
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [games, setGames] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [showSearch, setShowSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [dropdownOpen, setDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Carrinho
    const [cartOpen, setCartOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Pega carrinho do localStorage
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        async function fetchGames() {
            console.log("🔍 Buscando jogos do Supabase...");
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from("games").select("id, title, price, image");
            if (error) {
                console.error("❌ Erro ao buscar jogos do Supabase:", error);
            } else {
                console.log("✅ Jogos recebidos do Supabase:", data);
                setGames(data || []);
            }
        }
        fetchGames();
    }, []);
    // Busca jogos do Supabase
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        async function fetchGames() {
            console.log("🔍 Buscando jogos do Supabase...");
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from("games").select("id, title, price, image");
            if (error) {
                console.error("❌ Erro ao buscar jogos do Supabase:", error);
            } else {
                console.log("✅ Jogos recebidos do Supabase:", data);
                setGames(data || []);
            }
        }
        fetchGames();
    }, []);
    // Filtra resultados enquanto digita
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!searchTerm.trim()) {
            setSearchResults([]);
            console.log("🔍 Pesquisa limpa, resultados zerados");
            return;
        }
        const filtered = games.filter((g)=>g.title.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log("🔍 Resultados filtrados para:", searchTerm, filtered);
        setSearchResults(filtered);
    }, [
        searchTerm,
        games
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: "w-full bg-gray-800 p-4 shadow-md fixed top-0 left-0 z-50 flex justify-between items-center h-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-2xl sm:text-3xl font-bold text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            children: "GamersClub"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-6 text-sm sm:text-base relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative",
                                onMouseEnter: ()=>setDropdownOpen(true),
                                onMouseLeave: ()=>setDropdownOpen(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "flex items-center text-gray-300 hover:text-blue-400 cursor-pointer",
                                        children: "Explorar"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `absolute top-full left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50 transition-all duration-150 ${dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`,
                                        children: [
                                            genres.map((genre, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/games?genre=${genre}`,
                                                    className: "block px-4 py-2 text-white hover:bg-gray-600",
                                                    children: genre
                                                }, i, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {
                                                className: "border-gray-600 my-1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/promotions",
                                                className: "block px-4 py-2 text-white hover:bg-gray-600",
                                                children: "Promoções"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/novidades",
                                                className: "block px-4 py-2 text-white hover:bg-gray-600",
                                                children: "Novidades"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/Library",
                                className: "text-gray-300 hover:text-blue-400",
                                children: "Minha Biblioteca"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Buscar jogos...",
                                        className: "px-3 py-1 rounded-md text-black w-32 sm:w-48 focus:outline-none",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value),
                                        onFocus: ()=>setShowSearch(true),
                                        onBlur: ()=>setTimeout(()=>setShowSearch(false), 200)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    showSearch && searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-0 w-full bg-gray-700 rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto",
                                        children: searchResults.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/games/${g.id}`,
                                                className: "block px-4 py-2 text-white hover:bg-gray-600",
                                                onClick: ()=>setShowSearch(false),
                                                children: g.title
                                            }, g.id, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCartOpen(true),
                                className: "relative focus:outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        className: "w-6 h-6 text-gray-300 hover:text-blue-400 transition"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full",
                                        children: cart.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-gray-300 hover:text-blue-400 cursor-pointer",
                                        children: [
                                            "Olá, ",
                                            user.nickname || user.name,
                                            " 💰 €",
                                            user.balance?.toFixed(2) || "0"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/profile",
                                                className: "block px-4 py-2 text-white hover:bg-gray-600",
                                                children: "Editar Perfil"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/add-funds",
                                                className: "block px-4 py-2 text-white hover:bg-gray-600",
                                                children: "Adicionar Fundos"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/security",
                                                className: "block px-4 py-2 text-white hover:bg-gray-600",
                                                children: "Segurança"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: logout,
                                                className: "w-full text-left px-4 py-2 text-white hover:bg-gray-600",
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 205,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/register",
                                        className: "text-gray-300 hover:text-blue-400",
                                        children: "Registrar"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "text-gray-300 hover:text-blue-400",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CartSidebar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: cartOpen,
                setIsOpen: setCartOpen,
                cart: cart,
                setCart: setCart
            }, void 0, false, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/pages/_app.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/AuthContext.tsx [ssr] (ecmascript)"); // importe o AuthProvider
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$CardContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/CardContext.tsx [ssr] (ecmascript)");
;
;
;
;
;
function App({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$CardContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["CartProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$AuthContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/pages/_app.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                    className: "pt-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                        ...pageProps
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/_app.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/_app.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/_app.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__244e7be4._.js.map
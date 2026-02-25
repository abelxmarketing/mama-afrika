import { wixClient } from '@/lib/wixClient';
import MenuItemCard from '@/components/MenuItemCard';

export const revalidate = 60; // Revalidate every minute

export default async function MenuPage() {
    let menusData: any[] = [];
    let sectionsData: any[] = [];
    let itemsData: any[] = [];
    let variantsData: any[] = [];

    try {
        // Fetch menus, sections, and items
        const [menusRes, sectionsRes, itemsRes, variantsRes] = await Promise.all([
            wixClient.menus.queryMenus().find(),
            wixClient.sections.querySections().find(),
            wixClient.items.queryItems().find(),
            wixClient.itemVariants.queryVariants().find()
        ]);

        menusData = menusRes.items || [];
        sectionsData = sectionsRes.items || [];
        itemsData = itemsRes.items || [];
        variantsData = variantsRes.items || [];
    } catch (error) {
        console.error("Error loading menu data:", error);
    }

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight uppercase">Our <span className="text-[var(--color-accent)]">Menu</span></h1>
                <p className="text-white/70 text-lg mb-16 max-w-2xl font-light">
                    Discover the bold, authentic flavors of Africa carefully crafted from generations of family recipes.
                </p>

                {menusData.length === 0 ? (
                    <div className="py-20 text-center border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-medium mb-2 text-[var(--color-accent)]">Menu is currently being updated</h3>
                        <p className="text-white/60">Please check back soon to see our delicious offerings.</p>
                    </div>
                ) : (
                    menusData.map((menu) => {
                        return (
                            <div key={menu._id} className="mb-24">
                                <h2 className="text-4xl font-bold mb-12 text-[var(--color-accent)] border-b border-white/10 pb-4">{menu.name?.en || menu.name || "Main Menu"}</h2>

                                {(menu.sectionIds || []).map((sectionId: string) => {
                                    const section = sectionsData.find(s => s._id === sectionId);
                                    if (!section) return null;

                                    const sectionItems = (section.itemIds || [])
                                        .map((itemId: string) => itemsData.find(i => i._id === itemId))
                                        .filter(Boolean);

                                    if (sectionItems.length === 0) return null;

                                    return (
                                        <div key={section._id} className="mb-16">
                                            <h3 className="text-3xl font-semibold mb-8 text-white">{section.name?.en || section.name}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {sectionItems.map((item: any) => (
                                                    <MenuItemCard key={item._id} item={item} globalVariants={variantsData} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
}

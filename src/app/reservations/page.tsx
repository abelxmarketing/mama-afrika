'use client';

import { useState, useEffect } from 'react';
import { getAvailableSlots, createReservation } from '@/app/actions/reservations';

export default function ReservationsPage() {
    const [step, setStep] = useState(1);
    const [partySize, setPartySize] = useState(2);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [slots, setSlots] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [preferredTime, setPreferredTime] = useState<string>('');

    // Generate next 30 days for the dropdown
    const dates = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            iso: d.toISOString().split('T')[0],
            display: d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short' })
        };
    });

    const fetchSlots = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getAvailableSlots(date, partySize);
            if (result.slots) {
                setSlots(result.slots);
                setStep(2);
                // Reset preferred time when moving to step 2
                setPreferredTime('');
            } else if (result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError("Die Verfügbarkeit konnte nicht geladen werden.");
        } finally {
            setIsLoading(false);
        }
    };

    // Filter slots based on preferred time (+/- 45 mins)
    const getFilteredSlots = () => {
        if (!preferredTime) return [];
        const [prefH, prefM] = preferredTime.split(':').map(Number);

        return slots.filter((slot: any) => {
            const slotDate = new Date(slot.startDate);
            const prefDate = new Date(slotDate);
            prefDate.setHours(prefH, prefM, 0, 0);
            const diffMins = Math.abs(slotDate.getTime() - prefDate.getTime()) / (1000 * 60);
            return diffMins <= 45;
        });
    };

    // Get available preferred times based on today's time
    const getPreferredTimeOptions = () => {
        const options = [];
        const isToday = date === new Date().toISOString().split('T')[0];
        const now = new Date();

        for (let h = 8; h <= 21; h++) {
            for (let m of [0, 30]) {
                const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                if (isToday) {
                    const targetDate = new Date();
                    targetDate.setHours(h, m, 0, 0);
                    if (targetDate <= now) continue;
                }
                options.push(timeStr);
            }
        }
        return options;
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBooking(true);
        setError(null);
        try {
            const result = await createReservation({
                slotId: selectedSlot._id,
                startDate: selectedSlot.startDate,
                partySize,
                ...form
            });

            if (result.success) {
                setSuccess(true);
                setStep(4);
            } else if (result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError("Die Reservierung ist fehlgeschlagen.");
        } finally {
            setIsBooking(false);
        }
    };

    // --- Custom Dropdown Component ---
    const CustomDropdown = ({ value, options, onChange, placeholder }: { value: string, options: { value: string, label: string }[], onChange: (v: string) => void, placeholder?: string }) => {
        const [isOpen, setIsOpen] = useState(false);
        const selectedOption = options.find(opt => opt.value === value);

        return (
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white flex items-center justify-between focus:outline-none focus:border-orange-500 transition-all hover:bg-zinc-900 active:scale-[0.98]"
                >
                    <span className={selectedOption ? 'text-white' : 'text-white/30'}>
                        {selectedOption ? selectedOption.label : placeholder || 'Auswählen...'}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-orange-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <div
                            className="absolute top-full left-0 right-0 mt-2 border border-orange-500/20 rounded-2xl overflow-hidden z-[9999] shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200"
                            style={{ background: '#0d0d0d' }}
                        >
                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-5 py-4 hover:bg-orange-500 hover:text-black transition-colors border-b border-white/[0.05] last:border-0 ${value === opt.value ? 'bg-[#1a0a00] text-orange-400' : 'text-white/70'
                                            }`}
                                    >
                                        <div className="font-bold">{opt.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase">Tisch <span className="text-orange-500">Reservieren</span></h1>
                    <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
                        Erlebe authentische afrikanische Gastfreundschaft. Buche deinen Platz direkt online.
                    </p>
                </div>

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="flex justify-between items-center mb-12 max-w-md mx-auto relative">
                        <div className="absolute h-[2px] bg-white/10 w-full top-1/2 -translate-y-1/2 z-0" />
                        <div
                            className="absolute h-[2px] bg-orange-500 transition-all duration-500 top-1/2 -translate-y-1/2 z-0"
                            style={{ width: `${((step - 1) / 2) * 100}%` }}
                        />
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 border-2 transition-all duration-300 ${step >= s ? 'bg-orange-500 border-orange-500 text-black' : 'bg-black border-white/20 text-white/40'
                                    }`}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative z-10 bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    {/* Step 1: Selection */}
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-white/50">Gästeanzahl</label>
                                    <div className="flex bg-black rounded-2xl p-2 border border-white/5">
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => setPartySize(num)}
                                                className={`flex-grow py-3 rounded-xl font-bold transition-all ${partySize === num ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' : 'text-white/40 hover:text-white'
                                                    }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-white/50">Datum</label>
                                    <CustomDropdown
                                        value={date}
                                        onChange={(val) => setDate(val)}
                                        options={dates.map(d => ({ value: d.iso, label: d.display }))}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            <button
                                onClick={fetchSlots}
                                disabled={isLoading}
                                className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-orange-500/40 text-xl flex items-center justify-center gap-3 active:scale-95"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Verfügbarkeit Prüfen
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Step 2: Time Slots */}
                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-bold">Wähle eine Uhrzeit</h3>
                                <button onClick={() => setStep(1)} className="text-orange-500 hover:underline text-sm font-bold">Datum ändern</button>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-white/50">Wunsch-Uhrzeit</label>
                                <div className="max-w-xs">
                                    <CustomDropdown
                                        value={preferredTime}
                                        onChange={(val) => setPreferredTime(val)}
                                        options={getPreferredTimeOptions().map(time => ({ value: time, label: `${time} Uhr` }))}
                                        placeholder="Bitte wählen..."
                                    />
                                </div>
                            </div>

                            {preferredTime && (
                                <div className="space-y-4 pt-4 border-t border-white/5 animate-in fade-in duration-500">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/30">Verfügbare Zeiten um {preferredTime} Uhr</label>
                                    {getFilteredSlots().length === 0 ? (
                                        <div className="text-white/40 italic py-4">
                                            Leider keine direkten Treffer um diese Zeit. Bitte eine andere Zeit versuchen.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                            {getFilteredSlots().map((slot: any) => {
                                                const time = new Date(slot.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                return (
                                                    <button
                                                        key={slot._id}
                                                        onClick={() => {
                                                            setSelectedSlot(slot);
                                                            setStep(3);
                                                        }}
                                                        className="bg-black/50 hover:bg-orange-500 border border-white/5 hover:border-orange-500 text-white/70 hover:text-black font-bold py-4 rounded-xl transition-all"
                                                    >
                                                        {time}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {!preferredTime && slots.length === 0 && (
                                <div className="text-center py-12 space-y-4">
                                    <p className="text-white/40 italic">Leider sind für diesen Tag keine Plätze mehr frei.</p>
                                    <button onClick={() => setStep(1)} className="text-orange-500 font-bold underline">Anderes Datum wählen</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Form */}
                    {step === 3 && (
                        <form onSubmit={handleBooking} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Deine Details</h3>
                                <div className="text-right">
                                    <div className="text-orange-500 font-bold">{new Date(selectedSlot.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">{partySize} Personen • {new Date(date).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Vorname</label>
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        autoComplete="given-name"
                                        placeholder="Max"
                                        className="w-full bg-black border border-white/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 transition-colors"
                                        value={form.firstName}
                                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Nachname</label>
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        autoComplete="family-name"
                                        placeholder="Mustermann"
                                        className="w-full bg-black border border-white/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 transition-colors"
                                        value={form.lastName}
                                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="max@beispiel.de"
                                        className="w-full bg-black border border-white/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 transition-colors"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Telefon</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        autoComplete="tel"
                                        placeholder="+49"
                                        className="w-full bg-black border border-white/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 transition-colors"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
                            </div>



                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setStep(2)} className="flex-grow py-5 rounded-2xl border border-white/10 hover:bg-white/5 font-bold transition-all">Zurück</button>
                                <button
                                    type="submit"
                                    disabled={isBooking}
                                    className="flex-[2] bg-orange-500 hover:bg-orange-400 text-black font-black py-5 rounded-2xl transition-all shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-3"
                                >
                                    {isBooking ? (
                                        <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        "Jetzt Reservieren"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className="text-center py-12 space-y-8 animate-in fade-in zoom-in duration-700">
                            <div className="w-24 h-24 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(249,115,22,0.2)]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black uppercase">Tisch <span className="text-orange-500">Reserviert!</span></h2>
                                <p className="text-white/60 text-lg max-w-sm mx-auto">
                                    Wir haben deine Reservierung erhalten. Eine Bestätigungsmail ist auf dem Weg zu dir.
                                </p>
                            </div>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-sm flex flex-col items-center gap-2 max-w-xs mx-auto">
                                <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">Wann</span>
                                <span className="text-lg font-bold">{new Date(date).toLocaleDateString()}</span>
                                <span className="text-lg font-bold">Um {new Date(selectedSlot.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr</span>
                                <span className="text-white/40 mt-2">{partySize} Personen</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Footer */}
                <div className="relative z-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm opacity-50">
                    <div>
                        <p className="font-bold text-white mb-1">Anfahrt</p>
                        <p>Beispielstraße 123, 10115 Berlin</p>
                    </div>
                    <div>
                        <p className="font-bold text-white mb-1">Kontakt</p>
                        <p>+49 123 456789</p>
                    </div>
                    <div>
                        <p className="font-bold text-white mb-1">Öffnungszeiten</p>
                        <p>Di - So: 12:00 - 22:00</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  ACCOUNT_CATALOG_COUNT,
  ACCOUNT_CLASSES,
  getAccountClassCount,
} from '../data/accounts';
import { searchAccounts } from '../services/accountCatalog';
import type { AccountClassNumber } from '../types/accounting';

export function AccountCatalogSection() {
  const [query, setQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<AccountClassNumber | undefined>();
  const [showAll, setShowAll] = useState(false);

  const results = useMemo(
    () => searchAccounts(query, selectedClass),
    [query, selectedClass],
  );
  const visibleAccounts = showAll ? results : results.slice(0, 8);

  const selectClass = (classNumber?: AccountClassNumber) => {
    setSelectedClass(classNumber);
    setShowAll(false);
  };

  return (
    <View className="mt-8">
      <View className="flex-row items-end justify-between">
        <View>
          <Text className="text-xl font-bold text-white">Plan de comptes</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {results.length} compte{results.length === 1 ? '' : 's'} dans la sélection
          </Text>
        </View>
        <View className="rounded-full bg-emerald-500/15 px-3 py-1.5">
          <Text className="text-xs font-bold text-emerald-300">
            {ACCOUNT_CLASSES.length} classes · {ACCOUNT_CATALOG_COUNT} comptes
          </Text>
        </View>
      </View>

      <TextInput
        accessibilityLabel="Rechercher un compte par numéro ou libellé"
        className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white"
        onChangeText={(text) => {
          setQuery(text);
          setShowAll(false);
        }}
        placeholder="Rechercher un numéro ou un libellé"
        placeholderTextColor="#94A3B8"
        returnKeyType="search"
        value={query}
      />

      <ScrollView
        className="mt-3"
        contentContainerStyle={{ gap: 8, paddingRight: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{ selected: selectedClass === undefined }}
          className={`rounded-full border px-4 py-2 ${
            selectedClass === undefined
              ? 'border-emerald-400 bg-emerald-500/15'
              : 'border-slate-800 bg-slate-900'
          }`}
          onPress={() => selectClass(undefined)}
        >
          <Text
            className={`text-sm font-semibold ${
              selectedClass === undefined ? 'text-emerald-300' : 'text-slate-300'
            }`}
          >
            Toutes
          </Text>
        </TouchableOpacity>
        {ACCOUNT_CLASSES.map((accountClass) => {
          const isSelected = selectedClass === accountClass.classNumber;

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`rounded-full border px-4 py-2 ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-500/15'
                  : 'border-slate-800 bg-slate-900'
              }`}
              key={accountClass.classNumber}
              onPress={() => selectClass(accountClass.classNumber)}
            >
              <Text
                className={`text-sm font-semibold ${
                  isSelected ? 'text-emerald-300' : 'text-slate-300'
                }`}
              >
                {accountClass.classNumber} · {getAccountClassCount(accountClass.classNumber)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View className="mt-3 gap-2">
        {visibleAccounts.map((account) => (
          <View
            className="flex-row items-center rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
            key={account.accountNumber}
          >
            <View className="mr-3 min-w-14 rounded-lg bg-slate-800 px-2 py-1.5">
              <Text className="text-center font-bold text-emerald-300">
                {account.accountNumber}
              </Text>
            </View>
            <Text className="flex-1 text-sm text-slate-200">{account.label}</Text>
            <Text className="ml-2 text-xs font-semibold text-slate-500">
              C{account.classNumber}
            </Text>
          </View>
        ))}
        {results.length === 0 && (
          <View className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <Text className="text-sm text-slate-300">Aucun compte ne correspond à la recherche.</Text>
          </View>
        )}
      </View>

      {results.length > 8 && (
        <TouchableOpacity
          accessibilityRole="button"
          className="mt-3 items-center rounded-xl border border-slate-700 py-3"
          onPress={() => setShowAll((current) => !current)}
        >
          <Text className="font-semibold text-emerald-300">
            {showAll ? 'Réduire la liste' : `Afficher les ${results.length} comptes`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

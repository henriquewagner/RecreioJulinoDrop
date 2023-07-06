import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


//Produtos disponiveis na LISTA
const data = [
  { label: 'Quentão 237ml', value: '1', price: 5.00 },
  { label: 'Quentão 400ml', value: '2', price: 10.00 },
  { label: 'Quentão 500ml', value: '3', price: 15.00 },
  { label: 'Pipoca P', value: '4', price: 3.00 },
  { label: 'Pipoca M', value: '5', price: 6.00 },
  { label: 'Pipoca G', value: '6', price: 9.00 },
  { label: 'Bolo', value: '7', price: 4.00 },
  { label: 'Pé de Moleque', value: '8', price: 3.50 },
  { label: 'Cachorro-quente', value: '9', price: 5.00 },
];

//O componente DropdownComponent é definido como uma função de componente do React. 
// Ele renderiza a interface do usuário e gerencia o estado dos itens selecionados.
const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  //A constante getTotalItems é uma função que calcula o valor total dos itens selecionados na lista selectedItems
  const getTotalItems = () => {
    const totalValue = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);
    return { totalValue, totalQuantity };
  };
  // A constante handleOnChange é uma função que é chamada quando um item é selecionado no dropdown. 
  // Ela verifica se o item selecionado já existe na lista de selectedItems, ou seja, se o item já foi selecionado anteriormente.
  const handleOnChange = (item) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.value === item.value);

    if (existingItem) {
      //Se o item selecionado já existir na lista de selectedItems
      const updatedItems = selectedItems.map((selectedItem) => {
        // Ele irá mapear a lista de selectedItems
        if (selectedItem.value === item.value) {
          // Se o valor do item mapeado for igual ao valor do item selecionado atualmente
          return {
            ...selectedItem,
            quantity: selectedItem.quantity + 1,
          };
        }
        return selectedItem;
      });
      // Atualizar a lista de selectedItems com a quantidade atualizada
      setSelectedItems(updatedItems);
    } else {
      // Se o item selecionado não existir na lista de selectedItems
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
    // Atualizar o valor selecionado no dropdown
    setValue(item.value);
    // Definir o estado de foco do dropdown como falso (não está mais em foco)
    setIsFocus(false);
  };

  const handleRemoveItem = (item) => {
    // Filtrar a lista de selectedItems para remover o item correspondente
    const updatedItems = selectedItems.filter((selectedItem) => selectedItem.value !== item.value);
    // Atualizar a lista de selectedItems com os itens atualizados ( quando o item for removido)
    setSelectedItems(updatedItems);
  };

  //Resumidamente, no trecho abaixo é renderizado o componente Dropdown personalizado com as opções 
  //definidas no data. Ele também exibe uma lista de itens selecionados em um ScrollView, mostrando o 
  //nome, preço e quantidade de cada item. Para cada item, há um botão de remoção para remover o item da lista.
  return (
    <View style={styles.container}>

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#850ef5' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="Pesquisa aqui, sô!"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleOnChange}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#fff' : '#fff'}
            name="Safety"
            size={20}
          />
        )}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.selectItemsContainer}>
          <Text style={styles.ItemColorful}>Lista dos produtos:</Text>
          {selectedItems.map((item) => (
            <View key={item.value} style={styles.selectItem}>
              <Text style={styles.selectItemLabel}>{item.label}</Text>
              <Text style={styles.selectItemPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.selectItemUnit}>{item.quantity} UN</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.buttonRemove}>
                <AntDesign name="delete" size={20} color="#8E236B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.ItemColorful2}>Total de itens: {getTotalItems().totalQuantity}</Text>
        <Text style={styles.ItemColorful2}> Valor da compra: R${getTotalItems().totalValue.toFixed(2)}</Text>
      </View>

    </View>
  );
};

export default DropdownComponent;

// Esses estilos definem a aparência visual do componente DropdownComponent. Cada propriedade no objeto de estilos 
// representa uma determinada parte do componente, como o container, o dropdown em si, os ícones, os itens selecionados, entre outros.

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 11,
  },
  dropdown: {
    height: 45,
    borderColor: '#8E236B',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 9
  },
  icon: {
    marginRight: 20,
  },
  label: {
    position: 'relative',
    backgroundColor: '#8E236B',
    left: 21,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 15,

  },
  placeholderStyle: {
    fontSize: 16,
    color: '#8E236B',
  },
  selectTextStyle: {
    fontSize: 16,
    color: '#8E236B'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectItemsContainer: {
    marginTop: 16,
    color: '#8E236B'
  },
  footerContainer: {
  },
  ItemColorful: {
    fontSize: 18,
    color: '#8E236B',
    marginTop: 60,
  },

  ItemColorful2: {
    color: '#8E236B',
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center",
    marginTop: 60,

  },
  selectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectItemLabel: {
    color: '#8E236B',
    fontSize: 12,
  },
  selectItemPrice: {
    color: '#8E236B',
    fontSize: 15,
  },
  selectItemUnit: {
    color: '#8E236B',
    fontSize: 12,
  },
  buttonRemove: {
    flexDirection: 'row-reverse',
    alignItems: 'width',
  },

});
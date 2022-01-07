import pandas as pd
entrada=pd.read_csv('entradaCsv.csv',header=0)
entradaDf=pd.DataFrame(entrada)
tipo = entradaDf['tipo'].tolist()
tipos= pd.unique(tipo)
nombre=entradaDf['nombre'].tolist()
valor = entradaDf['valor'].tolist()
total1=sum([totalV1 for i,totalV1 in enumerate(valor) if tipo[i]==1])
total2=sum([totalV2 for i,totalV2 in enumerate(valor) if tipo[i]==2])
total3=sum([totalV3 for i,totalV3 in enumerate(valor) if tipo[i]==3])
total4=sum([totalV4 for i,totalV4 in enumerate(valor) if tipo[i]==4])
total=[total1,total2,total3,total4]
val_A = [valor[i] for i, vA in enumerate(nombre) if vA == 'A']
val_B = [valor[i] for i, vB in enumerate(nombre) if vB == 'B']
val_C = [valor[i] for i, vC in enumerate(nombre) if vC == 'C']
val_D = [valor[i] for i, vD in enumerate(nombre) if vD == 'D']
prom_A = [round(val_A[i]/total[i], 2) for i in range(len(tipos))]
prom_B = [round(val_B[i]/total[i], 2) for i in range(len(tipos))]
prom_C = [round(val_C[i]/total[i], 2) for i in range(len(tipos))]
prom_D = [round(val_D[i]/total[i], 2) for i in range(len(tipos))]
df = pd.DataFrame(dict(
    tipo=tipos,
    promedio_A=prom_A,
    promedio_B=prom_B,
    promedio_C=prom_C,
    promedio_D=prom_D,
     Total=total    
))
print(df)

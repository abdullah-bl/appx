import { Branch, Unit } from '@prisma/client'
import Label from 'components/label'
import { useState } from 'react'
import Select from 'react-select'
import useSWR from 'swr/immutable'

type SelectedTyped = {
	value: number
	label: string
}

const SelectBranch = () => {
	const [selectBranch, setSelectBranch] = useState<SelectedTyped>()
	// const [selectUnit, setSelectBranch] = useState<SelectedTyped>()
	const { data: branches, error: branchesError } = useSWR('/api/branches')

	// const { data, error } = useSWR('/api/branches')
	if (branchesError) return <div>failed to load</div>
	if (!branches) return <div>loading...</div>

	return (
		<div>
			<Label>
				Select Branch : {selectBranch?.label}
				<Select
					onChange={(e: any) => setSelectBranch(e as SelectedTyped)}
					options={branches.map((branch: Branch) => ({
						label: branch.name,
						value: branch.id,
					}))}
				/>
			</Label>
			<Label>
				Select Branch : {selectBranch?.label}
				<Select
					onChange={(e: any) => setSelectBranch(e as SelectedTyped)}
					options={
						selectBranch &&
						branches
							.find((branch: Branch) => branch.id === selectBranch.value)
							?.units.map((unit: Unit) => ({
								label: unit.name,
								value: unit.id,
							}))
					}
				/>
			</Label>
		</div>
	)
}

export default SelectBranch

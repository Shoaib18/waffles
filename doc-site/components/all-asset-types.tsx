import groupAssets from 'helpers/group-assets';
import * as allAssets from '@datacamp/waffles/asset';

import AssetGrid from './asset-grid';

// TODO: Handle splitting assets up into their types (3D, assignment, misc etc) @ixTec

function AllAssetTypes() {
  const groupedAssets = groupAssets(allAssets);
  return Object.entries(groupedAssets).map(([groupName, assetGroup]) => (
    <AssetGrid key={groupName} assetType={groupName} assets={assetGroup} />
  ));
}

export default AllAssetTypes;
